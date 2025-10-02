Agent Wallboard Desktop App - Icon Assets
==========================================

Required Files:
--------------
1. icon.png (256x256px) - Main application icon
2. tray-icon.png (32x32px) - System tray icon

Creating Icons:
--------------
Option 1: Use online tools
- https://www.favicon-generator.org/
- https://favicon.io/

Option 2: Use placeholder
curl -L -o icon.png "https://placehold.co/256x256/667eea/FFFFFF.png?text=Agent"
curl -L -o tray-icon.png "https://placehold.co/32x32/667eea/FFFFFF.png?text=A"

Option 3: Use ImageMagick
convert -size 256x256 xc:#667eea -gravity center -pointsize 72 -fill white -annotate +0+0 "A" icon.png
convert -size 32x32 xc:#667eea -gravity center -pointsize 20 -fill white -annotate +0+0 "A" tray-icon.png