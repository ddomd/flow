<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Column extends Model
{
    use HasUuids, HasFactory;

    protected $fillable = [
        'name',
        'color',
    ];

    public function board(): BelongsTo {
        return $this->belongsTo(Board::class);
    }

    public function tasks(): HasMany {
        return $this->hasMany(Task::class);
    }
}
