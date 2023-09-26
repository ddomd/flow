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

    // Constants for position calculations
    const POSITION_GAP = 60000;
    const POSITION_MIN = 0.00002;

    protected $fillable = [
        'title',
        'description',
        'position'
    ];

    public static function booted()
    {
        // When creating a new task, calculate and set its position within the column
        // based on the existing tasks positions
        static::creating(function ($model) {
            $model->position = self::query()
                ->where('column_id', $model->column_id)
                ->orderByDesc('position')
                ->first()?->position + self::POSITION_GAP;
        });

        // After saving a task, check and adjust its position within the column
        // if it falls below the minimum threshold
        static::saved(function ($model) {
            // Reset the previous position value to 0
            if ($model->position < self::POSITION_MIN) {
                DB::statement("SET @previousPosition := 0");

                // Update task positions in the same column
                DB::statement(
                    "
                    UPDATE cards
                    SET position = (@previousPosition := @previousPosition + ?)
                    WHERE column_id = ?
                    ORDER BY position
                ",
                    [
                        self::POSITION_GAP,
                        $model->column_id
                    ]
                );
            }
        });
    }

    public function column(): BelongsTo
    {
        return $this->belongsTo(Column::class);
    }

    public function board(): BelongsTo
    {
        return $this->belongsTo(Board::class);
    }

    public function subtasks(): HasMany
    {
        return $this->hasMany(Subtask::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }
}
