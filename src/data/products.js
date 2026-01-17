export const PRODUCTS = [
    {
    id: "1",
    name: "Urban Street Sneakers",
    description: "Lightweight sneakers designed for everyday comfort, featuring breathable materials and a modern urban look.",
    price: 200,
    category: "shoe",
    images: ["/images/products/6.jpg"],
    isFeatured: true,
    isNewProduct: true,
    isActive: true,
    colors: [
        {
            name: "Brown",
            hexCode: "#b48948ff",
            images: [
                "/images/products/6.jpg",
                "/images/products/7.jpg"
            ],
            sizes: [
                { label: "40", stock: 12 },
                { label: "41", stock: 15 },
                { label: "42", stock: 10 },
                { label: "43", stock: 6 }
            ]
        },
        {
            name: "Black",
            hexCode: "#000000ff",
            images: [
                "/images/products/8.jpg",
                "/images/products/9.jpg"
            ],
            sizes: [
                { label: "40", stock: 8 },
                { label: "41", stock: 9 },
                { label: "42", stock: 7 },
                { label: "43", stock: 5 }
            ]
        }
    ]
},
{
    id: "2",
    name: "Premium Leather Loafers",
    description: "Elegant leather shoes crafted for formal and smart-casual wear, offering comfort and a refined finish.",
    price: 300,
    category: "shoe",
    images: ["/images/products/11.jpg"],
    isFeatured: false,
    isNewProduct: true,
    isActive: true,
    colors: [{
            name: "Blue",
            hexCode: "#3e82c2ff",
            images: [
                "/images/products/10.jpg",
                "/images/products/11.jpg"
            ],
            sizes: [
                { label: "39", stock: 5 },
                { label: "40", stock: 9 },
                { label: "41", stock: 11 },
                { label: "42", stock: 7 }
            ]
        },
        {
            name: "Purple",
            hexCode: "#6938a4ff",
            images: [
                "/images/products/12.jpg"
            ],
            sizes: [
                { label: "39", stock: 5 },
                { label: "40", stock: 9 },
                { label: "41", stock: 11 },
                { label: "42", stock: 7 }
            ]
        }
    ]
},
    {
    id: "3",
    name: "Classic Blue Jeans",
    description: "Durable everyday jeans with a comfortable fit, designed for all-day wear and timeless style.",
    price: 200,
    category: "jeans",
    images: ["/images/products/1.jpg"],
    isFeatured: false,
    isNewProduct: false,
    isActive: true,
    colors: [
        {
            name: "Blue",
            hexCode: "#3c7bd3ff",
            images: [
                "/images/products/1.jpg",
                "/images/products/2.jpg"
            ],
            sizes: [
                { label: "X", stock: 6 },
                { label: "XL", stock: 12 },
                { label: "L", stock: 9 }
            ]
        }
    ]
},
{
    id: "4",
    name: "Slim Fit Denim",
    description: "Modern slim-fit jeans made from premium denim, offering flexibility and a clean silhouette.",
    price: 150,
    category: "jeans",
    images: ["/images/products/3.jpg"],
    isFeatured: true,
    isNewProduct: true,
    isActive: true,
    colors: [
        {
            name: "Dark Blue",
            hexCode: "#1f3a5fff",
            images: [
                "/images/products/3.jpg",
                "/images/products/4.jpg",
                "/images/products/5.jpg"
            ],
            sizes: [
                { label: "X", stock: 6 },
                { label: "XL", stock: 12 },
                { label: "L", stock: 9 }
            ]
        }
    ]
}
];
