# Frontend Mentor - Conference ticket generator

![Design preview for the Conference ticket generator coding challenge](./preview.jpg)

## Project Structure 
```GraphQL
project/
├── index.html               # Main HTML file
├── style.css                # Global CSS
│     
├── assets/                  # Static resources (global)
│   ├── images/              # Logos, icons, backgrounds
│   │    └── logo.png
│   ├── fonts/               # Custom fonts (woff, ttf...)
│   │    └── Inter-Regular.woff2
│   └── icons/               # SVG or PNG icons
│        └── upload.svg
│
│
├── src/                     # Application source code
│   ├── controllers/         # Handle events & app flow
│   │    └── FileController.js
│   ├── services/            # Core logic (validation, UI updates)
│   │    ├── FileValidationService.js
│   │    └── UIService.js
│   ├── utils/               # Small helpers
│   │    └── formatDate.js
│   └── main.js              # Entry point, bootstraps everything
│
│
├── tests/                   # All your tests live here
│   ├── models/
│   │   └── FileModel.test.js
│   ├── controllers/
│   │   └── FileController.test.js
│   ├── services/
│   │   └── FileValidationService.test.js
│   └── utils/
│       └── DOMutils.test.js
│
│
├── README.md                # Project documentation 
└── package.json             # (if you later use npm/yarn)

```

