# Image Sources and Recommendations

This file contains information about the images used in the ElectroShop website and how to replace them with your own.

## 🖼️ Current Images from Unsplash (Free Stock Photos)

All images are currently sourced from **Unsplash** - a free stock photo platform with no attribution required for commercial use.

### Hero Section Floating Cards

1. **Lighting (Gold Card)**
   - Current: `https://images.unsplash.com/photo-1513506003901-1e6a229e2d15`
   - Keyword: "LED bulb light"

2. **Power Solutions (Blue Card)**
   - Current: `https://images.unsplash.com/photo-1473341304170-971dccb5ac1e`
   - Keyword: "electrical plug socket"

3. **Electronics (Green Card)**
   - Current: `https://images.unsplash.com/photo-1498049794561-7780e7231661`
   - Keyword: "laptop electronics"

### Category Section Images

1. **Lighting Category**
   - Current: `https://images.unsplash.com/photo-1513506003901-1e6a229e2d15`
   - Search: "LED light bulb", "smart lighting", "modern lamp"

2. **Cables Category**
   - Current: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64`
   - Search: "electrical cables", "wires", "USB cables"

3. **Switches Category**
   - Current: `https://images.unsplash.com/photo-1621905252507-b35492cc74b4`
   - Search: "light switch", "electrical switch", "wall switch"

4. **Tools Category**
   - Current: `https://images.unsplash.com/photo-1530124566582-a618bc2615dc`
   - Search: "electrical tools", "screwdriver", "repair tools"

5. **Accessories Category**
   - Current: `https://images.unsplash.com/photo-1583394838336-acd977736f90`
   - Search: "USB charger", "power adapter", "electrical accessories"

6. **Smart Devices Category**
   - Current: `https://images.unsplash.com/photo-1558002038-1055907df827`
   - Search: "smart home device", "IoT device", "smart speaker"

### Daily Deals Products

1. **Smart LED Bulb**
   - Same as Lighting category

2. **Smart Home Hub**
   - Same as Smart Devices category

### About Section

- Current: `https://images.unsplash.com/photo-1621905252507-b35492cc74b4`
- Search: "electrical equipment", "workshop", "electrical panel"

## 🔄 How to Replace Images

### Method 1: Use Unsplash (Recommended - Free & Legal)

1. Visit [Unsplash.com](https://unsplash.com)
2. Search for relevant keywords (see list above)
3. Click on the image you want
4. Click "Download" or right-click and copy image address
5. Get the image URL (should look like: `https://images.unsplash.com/photo-...`)
6. Replace URLs in the files below

### Method 2: Use Other Free Stock Photo Sites

- **Pexels**: https://pexels.com (Free, no attribution required)
- **Pixabay**: https://pixabay.com (Free, no attribution required)
- **Unsplash**: https://unsplash.com (Free, no attribution required)

### Method 3: Use Your Own Images

1. Upload your images to a hosting service (e.g., Imgur, your own server)
2. Get the direct image URL
3. Replace the URLs in the code

## 📝 Files to Edit

### 1. `styles.css`

Search for and replace these image URLs:

```css
/* Hero Cards */
.lighting-img { background: url('YOUR_IMAGE_URL'); }
.power-img { background: url('YOUR_IMAGE_URL'); }
.electronics-img { background: url('YOUR_IMAGE_URL'); }

/* Categories */
.lighting-category { background: url('YOUR_IMAGE_URL'); }
.cables-category { background: url('YOUR_IMAGE_URL'); }
.switches-category { background: url('YOUR_IMAGE_URL'); }
.tools-category { background: url('YOUR_IMAGE_URL'); }
.accessories-category { background: url('YOUR_IMAGE_URL'); }
.smart-category { background: url('YOUR_IMAGE_URL'); }

/* Daily Deals */
.smart-bulb-img { background: url('YOUR_IMAGE_URL'); }
.smart-hub-img { background: url('YOUR_IMAGE_URL'); }

/* About Section */
.about-img-placeholder { background-image: url('YOUR_IMAGE_URL'); }
```

### 2. `script.js`

Search for `productImages` object and replace URLs:

```javascript
const productImages = {
    'lighting': 'url(YOUR_IMAGE_URL)',
    'cables': 'url(YOUR_IMAGE_URL)',
    'switches': 'url(YOUR_IMAGE_URL)',
    'tools': 'url(YOUR_IMAGE_URL)',
    'accessories': 'url(YOUR_IMAGE_URL)',
    'smart': 'url(YOUR_IMAGE_URL)'
};
```

## 🎨 Image Specifications

### Recommended Image Sizes:

- **Hero Cards**: 400x400px (square)
- **Category Images**: 600x400px (landscape)
- **Product Images**: 500x500px (square)
- **Deal Products**: 400x400px (square)
- **About Section**: 800x800px (square or landscape)

### Image Format:
- **Preferred**: JPG (for photos), PNG (for graphics with transparency)
- **Acceptable**: WebP (modern, smaller file size)

### Image Quality:
- Use high-quality images (at least 72 DPI for web)
- Keep file size under 500KB per image for fast loading
- Optimize images using tools like TinyPNG or ImageOptim

## 🔍 Search Keywords for Finding Images

### Lighting Products:
- "LED bulb", "smart light", "modern lamp", "pendant light", "chandelier"

### Cables & Wires:
- "electrical cables", "USB cable", "HDMI cable", "extension cord", "power cable"

### Switches:
- "light switch", "smart switch", "electrical switch", "toggle switch", "dimmer"

### Tools:
- "electrical tools", "screwdriver set", "multimeter", "wire stripper", "tool kit"

### Accessories:
- "phone charger", "power bank", "USB adapter", "extension socket", "surge protector"

### Smart Devices:
- "smart home hub", "IoT device", "smart speaker", "home automation", "smart plug"

## ⚠️ Copyright & Legal

- **Unsplash, Pexels, Pixabay**: Free for commercial use, no attribution required
- **Google Images**: Most images are copyrighted - DO NOT use directly
- **Stock Photo Sites**: Some require paid licenses
- **Your Own Photos**: Always legal and recommended

## 💡 Tips for Best Results

1. **Consistency**: Use images with similar lighting and style
2. **Quality**: Higher resolution looks more professional
3. **Relevance**: Make sure images match the product category
4. **Optimization**: Compress images to reduce loading time
5. **Testing**: Check how images look on mobile devices

## 🚀 Quick Setup

If you want to use the current Unsplash images, no changes needed! They're already integrated and will work immediately.

To use custom images:
1. Find/upload your images
2. Get the image URLs
3. Replace URLs in `styles.css` and `script.js`
4. Test on your browser
5. Done!

---

**Need Help?** 
- Unsplash has excellent search and filtering options
- All images are free and legal to use
- No signup required to use the images


