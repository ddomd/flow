<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;

class Task extends Model
{
    use HasFactory;

    const POSITION_GAP = 60000;
    const POSITION_MIN = 0.00002;

    protected $fillable = [
        'title',
        'description',
        'position'
    ];

    public static function booted() {
        static::creating(function ($model) {
            $model->position = self::query()
                ->where('column_id', $model->column_id)
                ->orderByDesc('position')
                ->first()?->position + self::POSITION_GAP;
        });
 
        static::saved(function ($model) {
            if ($model->position < self::POSITION_MIN) {
                DB::statement("SET @previousPosition := 0");
                DB::statement("
                    UPDATE cards
                    SET position = (@previousPosition := @previousPosition + ?)
                    WHERE column_id = ?
                    ORDER BY position
                ", [
                        self::POSITION_GAP,
                        $model->column_id
                    ]
                );
            }
        });
    }

    public function column(): BelongsTo {
        return $this->belongsTo(Column::class);
    }

    public function board(): BelongsTo {
        return $this->belongsTo(Board::class);
    }

    public function subtasks(): HasMany {
        return $this->hasMany(Subtask::class);
    }

    public function tags(): BelongsToMany {
        return $this->belongsToMany(Tag::class);
    }
}
