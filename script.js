        // Loading animation
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loading').style.opacity = '0';
                setTimeout(() => {
                    document.getElementById('loading').style.display = 'none';
                }, 500);
            }, 1000);
        });

        // Custom cursor
        const cursor = document.getElementById('cursor');
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(0.8)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Cart functionality
        let cart = [];
        let cartCount = 0;

        function updateCartCount() {
            document.getElementById('cartCount').textContent = cartCount;
        }

        function addToCart(productId, productName, price) {
            cart.push({ id: productId, name: productName, price: price });
            cartCount++;
            updateCartCount();
            
            // Visual feedback
            const button = event.target;
            const originalText = button.textContent;
            button.textContent = 'Added!';
            button.style.background = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'linear-gradient(45deg, #ff6b35, #f7931e)';
            }, 1000);
        }

        function toggleCart() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            let cartSummary = 'Cart Items:\n\n';
            let total = 0;
            
            cart.forEach((item, index) => {
                cartSummary += `${index + 1}. ${item.name} - $${item.price}\n`;
                total += item.price;
            });
            
            cartSummary += `\nTotal: $${total.toFixed(2)}`;
            alert(cartSummary);
        }

        // Products data
        const products = [
            { id: 1, name: 'Premium Smartphone', price: 899, emoji: '📱' },
            { id: 2, name: 'Wireless Headphones', price: 199, emoji: '🎧' },
            { id: 3, name: 'Smart Watch', price: 299, emoji: '⌚' },
            { id: 4, name: 'Laptop Pro', price: 1299, emoji: '💻' },
            { id: 5, name: 'Gaming Console', price: 499, emoji: '🎮' },
            { id: 6, name: 'Camera Kit', price: 799, emoji: '📸' }
        ];

        // Generate product cards
        function generateProducts() {
            const productsGrid = document.getElementById('productsGrid');
            
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <div class="product-image">
                        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 4rem; opacity: 0.7;">
                            ${product.emoji}
                        </div>
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">$${product.price}</div>
                        <button class="add-to-cart" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                            Add to Cart
                        </button>
                    </div>
                `;
                productsGrid.appendChild(productCard);
            });
        }

        // Newsletter subscription
        function handleNewsletter(event) {
            event.preventDefault();
            const email = event.target.querySelector('.newsletter-input').value;
            alert(`Thank you for subscribing with email: ${email}`);
            event.target.reset();
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(10, 10, 10, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(10, 10, 10, 0.8)';
                header.style.backdropFilter = 'blur(20px)';
            }
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            generateProducts();
            
            // Add stagger effect to product cards
            setTimeout(() => {
                const productCards = document.querySelectorAll('.product-card');
                productCards.forEach((card, index) => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.6s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 1500);
        });

        // Parallax effect for floating elements
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelectorAll('.floating-element');
            
            parallax.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
            });
        });