(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        } 
    });
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:2
            },
            1200:{
                items:2
            }
        }
    });


    // vegetable carousel
    $(".vegetable-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });



    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue) - 1;
            } else {
                newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

    // Add to cart functionality
    $('.add-to-cart-btn').on('click', function(e) {
        e.preventDefault();
        const productId = $(this).data('product-id');
        
        $.ajax({
            url: `/add-product-to-cart/${productId}`,
            type: 'POST',
            contentType: 'application/json',
            success: function(response) {
                if (response.success) {
                    // Update cart count
                    $('.cart-count').text(response.cartSum);
                    
                    // Show success message
                    alert(response.message);
                } else {
                    if (response.redirect) {
                        window.location.href = response.redirect;
                    } else {
                        alert(response.message);
                    }
                }
            },
            error: function(xhr) {
                const response = xhr.responseJSON;
                if (response && response.redirect) {
                    window.location.href = response.redirect;
                } else {
                    alert('Lỗi khi thêm sản phẩm vào giỏ hàng');
                }
            }
        });
    });

    // Cart page quantity update
    $(document).on('click', '.update-quantity', function() {
        const action = $(this).data('action');
        const cartDetailId = $(this).data('cart-detail-id');
        const $row = $(this).closest('tr');
        const $qtyInput = $row.find('.qty-input');
        let currentQty = parseInt($qtyInput.val());
        
        if (action === 'plus') {
            currentQty++;
        } else if (action === 'minus' && currentQty > 1) {
            currentQty--;
        } else if (action === 'minus' && currentQty === 1) {
            return; // Don't allow quantity to go below 1
        }
        
        $qtyInput.val(currentQty);
        
        // Update total price
        const price = parseInt($row.find('td').eq(2).text());
        const totalPrice = currentQty * price;
        $row.find('.total-price').text(totalPrice + ' $');
        
        // Update cart totals
        updateCartTotals();
    });

    // Remove item from cart
    $(document).on('click', '.remove-item', function() {
        const productId = $(this).data('product-id');
        if (confirm('Bạn chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?')) {
            $(this).closest('tr').fadeOut(300, function() {
                $(this).remove();
                updateCartTotals();
            });
        }
    });

    // Update cart totals
    function updateCartTotals() {
        let subtotal = 0;
        $('.total-price').each(function() {
            subtotal += parseInt($(this).text());
        });
        
        const shipping = 3;
        const total = subtotal + shipping;
        
        $('.subtotal').text('$' + subtotal);
        $('.grand-total').text('$' + total);
    }

})(jQuery);

