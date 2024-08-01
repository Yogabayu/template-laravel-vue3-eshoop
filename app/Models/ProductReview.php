<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductReview extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'product_id',
        'name',
        'email',
        'star',
        'review',
    ];

    public function productGenerals()
    {
        return $this->belongsTo(ProductGeneral::class, 'product_id');
    }

    public function productReviewFiles()
    {
        return $this->hasMany(ProductReviewFile::class);
    }
}
