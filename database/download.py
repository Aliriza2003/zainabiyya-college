import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = {
    'tailwindcss.js': 'https://cdn.tailwindcss.com',
    'dexie.js': 'https://unpkg.com/dexie@3.2.4/dist/dexie.js',
    'chart.js': 'https://cdn.jsdelivr.net/npm/chart.js'
}

for name, url in urls.items():
    print(f"Downloading {name}...")
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, context=ctx) as response, open(name, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
        print(f"Saved {name}")
    except Exception as e:
        print(f"Error downloading {name}: {e}")
