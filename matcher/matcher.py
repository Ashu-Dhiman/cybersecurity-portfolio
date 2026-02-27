from flask import Flask, request, Response
from website.matcher.pattern_loader import load_patterns
import re
import json

app = Flask(__name__)
PATTERNS = load_patterns()

@app.route("/match", methods=["POST"])
def match_request():

    # -------------------------------
    # FAIL-OPEN (never block traffic)
    # -------------------------------
    try:
        data = request.get_json(force=True)
    except Exception:
        return Response(
            json.dumps({"matched": False}),
            status=200,
            mimetype="application/json"
        )

    method = data.get("method", "")
    headers = data.get("headers", {})
    body = data.get("body", "") or ""
    path = data.get("path", "") or ""
    query = data.get("query_string", "") or ""
    full_data = f"{body} {path} {query}"

    content_type = headers.get("Content-Type", "").lower()

    # -------------------------------
    # PATTERN LOOP
    # -------------------------------
    for pattern in PATTERNS:

        if not pattern.get("enabled", False):
            continue

        if method not in pattern.get("methods", []):
            continue

        rules = pattern.get("match", {})
        headers_rule = rules.get("headers", [])

        # -------------------------------
        # HEADER MATCH
        # -------------------------------
        headers_rule = rules.get("headers", [])
        if headers_rule:
            if content_type and not any(h.lower() in content_type for h in headers_rule):
                pass  # ignore header restriction


        # -------------------------------
        # BODY CONTAINS (ALL tokens)
        # -------------------------------
        contains = rules.get("body_contains", [])
        if contains:
            if not all(token in body for token in contains):
                continue

        # -------------------------------
        # BODY REGEX (ALL patterns)
        # -------------------------------
        body_regex = rules.get("body_regex", [])
        if body_regex:
            try:
                if not any(re.search(rx, full_data, re.I | re.S) for rx in body_regex):
                    continue
            except re.error:
                continue

        # -------------------------------
        # PATH REGEX
        # -------------------------------
        path_regex = rules.get("path_regex", [])
        if path_regex:
            try:
                if not all(re.search(rx, path, re.I) for rx in path_regex):
                    continue
            except re.error:
                continue

        # -------------------------------
        # QUERY REGEX
        # -------------------------------
        query_regex = rules.get("query_regex", [])
        if query_regex:
            try:
                if not all(re.search(rx, query, re.I) for rx in query_regex):
                    continue
            except re.error:
                continue

        # -------------------------------
        # ✅ MATCH FOUND
        # -------------------------------
        return Response(
            json.dumps({
                "matched": True,
                "pattern_id": pattern.get("id", "unknown"),
                "severity": pattern.get("severity", "unknown")
            }),
            status=200,
            mimetype="application/json"
        )

    # -------------------------------
    # ❌ NO MATCH
    # -------------------------------
    return Response(
        json.dumps({"matched": False}),
        status=200,
        mimetype="application/json"
    )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9001)
