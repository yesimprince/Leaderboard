import urllib.request
import re

css_url = "https://cpt.mentorpick.com/assets/index-CJ7ncmM0.css"
js_url = "https://cpt.mentorpick.com/assets/index-D1zmaO0x.js"

print("Analyzing CSS...")
req = urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    css_content = urllib.request.urlopen(req).read().decode('utf-8')
    if "tw-" in css_content or "bg-" in css_content and "text-" in css_content:
        print("- Uses Tailwind CSS")
    if "lucide" in css_content.lower():
        print("- Uses Lucide Icons")
except Exception as e:
    print(f"Error reading CSS: {e}")

print("\nAnalyzing JS...")
req = urllib.request.Request(js_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    js_content = urllib.request.urlopen(req).read().decode('utf-8')
    frameworks = []
    if "react" in js_content.lower() or "useeffect" in js_content.lower() or "usestate" in js_content.lower():
        frameworks.append("React")
    if "vue" in js_content.lower():
        frameworks.append("Vue")
    if "svelte" in js_content.lower():
        frameworks.append("Svelte")
    if "recharts" in js_content.lower() or "chart.js" in js_content.lower():
        frameworks.append("Charting Library (e.g. Recharts)")
    if "axios" in js_content.lower():
        frameworks.append("Axios for HTTP requests")
    if "zustand" in js_content.lower() or "redux" in js_content.lower():
        frameworks.append("State Management (Zustand/Redux)")
    
    print(f"- Detected Frameworks/Libraries: {', '.join(frameworks)}")
    
    # Extract API endpoints
    endpoints = re.findall(r'https://[^"\']+\.mentorpick\.com/[a-zA-Z0-9_/]+', js_content)
    if endpoints:
        print("\n- Detected internal API Endpoints:")
        for ep in set(endpoints):
            print(f"  {ep}")

except Exception as e:
    print(f"Error reading JS: {e}")

