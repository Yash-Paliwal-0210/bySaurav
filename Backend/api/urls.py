from django.urls import path
from . import views
from .views import ProductListCreate

urlpatterns = [
    # path('api/products/', ProductListCreate.as_view(), name='product-list-create'),
    path('products/', views.add_product, name='add_product'),
    path('get_products/', views.get_all_products, name='get_all_products'),
    path('update_product/<str:product_id>/', views.update_product, name='update_product'),
    path('delete_product/<str:product_id>/', views.delete_product, name='delete_product'),
    path('place_order/', views.place_order, name='place_order'),
    path('register/', views.register_user, name='register_user'),
    path('login/', views.login_user, name='login_user'),
    # path('logout/', views.logout_user, name='logout_user'),
    path('csrf/', views.get_csrf_token, name='get_csrf_token'),
    path('order/<str:order_id>/', views.get_order, name='get_order'),  # Keep this for getting order
    path('orders/', views.get_admin_orders,name='get_admin_orders'), 
    path('users/', views.get_admin_users,name='get_admin_users'), 
    path('order/update/<str:order_id>/', views.update_order, name='update_order'),  # Different URL for updating order
    path('user/update/<str:user_id>/', views.update_user, name='update_user'),  # Different URL for updating user
    path('user/add_order/<str:user_id>/', views.add_order_to_user, name='add_order_to_user'),
    path('product/update_stock/<str:product_id>/', views.update_stock, name='update_stock'),
    path('create_razorpay_order/', views.create_razorpay_order, name='create_razorpay_order'),
]
