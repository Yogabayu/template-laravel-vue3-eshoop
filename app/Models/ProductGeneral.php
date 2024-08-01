<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductGeneral extends Model
{
    use HasFactory, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'user_id',
        'category_id',
        'shipping_id',
        'name',
        'desc',
        'slug',
        'price',
        'discount_price',
        'weight',
        'material',
        'color',
        'dimension',
        'stock_quantity',
        'isDangerous',
        'isHotDeal',
        'location',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'weight' => 'decimal:2',
        'isDangerous' => 'boolean',
        'isHotDeal' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function shippingOption()
    {
        return $this->belongsTo(ShippingOption::class);
    }

    public function productImages()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function productReviews()
    {
        return $this->hasMany(ProductReview::class);
    }
}
