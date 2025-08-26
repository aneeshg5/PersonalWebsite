# Technology Logos

This folder contains square logo images for various technologies used in the skills section.

## Requirements

- **Format**: PNG, JPG, or SVG
- **Size**: Square aspect ratio (e.g., 512x512, 256x256, etc.)
- **Background**: Preferably transparent or white background
- **Quality**: High resolution for crisp display

## Usage

To use a custom logo instead of a lucide-react icon:

1. Add your square logo file to this folder (e.g., `python.png`)
2. In `components/sections/skills.tsx`, update the skill's icon property:

```typescript
// Instead of a React component:
{ name: "Python", years: 6, icon: <SomeIcon /> }

// Use the image path:
{ name: "Python", years: 6, icon: "/logos/python.png" }
```

## Current Image Placeholders

The following skills are currently set to use custom images (you'll need to add these files):

### Programming Languages
- `cpp.png` - C++ logo
- `swift.png` - Swift logo

### Frameworks & Libraries  
- `flask.png` - Flask logo
- `nextjs.png` - Next.js logo
- `angular.png` - Angular logo

### Development Tools
- `vscode.png` - Visual Studio Code logo
- `aws.png` - Amazon Web Services logo
- `postgresql.png` - PostgreSQL logo
- `git.png` - Git logo
- `docker.png` - Docker logo

### Machine Learning
- `tensorflow.png` - TensorFlow logo
- `pytorch.png` - PyTorch logo
- `sklearn.png` - Scikit-learn logo
- `pandas.png` - Pandas logo
- `numpy.png` - NumPy logo

## Tips

- All icons will be automatically sized to 20x20 pixels (w-5 h-5 in Tailwind)
- The `object-contain` class ensures logos maintain aspect ratio
- Use official brand logos when possible for authenticity
- Consider the dark background when choosing logo variants
