<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Board extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'pinned'
    ];

    protected $attributes = [
        'pinned' => false,
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function columns(): HasMany {
        return $this->hasMany(Column::class);
    }

    public function tasks(): HasMany {
        return $this->hasMany(Task::class);
    }

    public function tags(): HasMany {
        return $this->hasMany(Tag::class);
    }
}
