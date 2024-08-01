<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSetting extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'name',
        'icon',
        'desc',
        'wa',
        'fb',
        'ig',
        'email',
        'twitter',
        'meta_title',
        'meta_description',
        'meta_keywords',
    ];
}
