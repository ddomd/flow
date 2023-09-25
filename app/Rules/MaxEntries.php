<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Database\Eloquent\Collection;


class MaxEntries implements ValidationRule
{
    protected $maxCount;

    /**
     * Create a new rule instance.
     *
     * @param int $maxCount
     */
    public function __construct(Collection $collection, $maxCount)
    {   
        $this->collection = $collection;
        $this->maxCount = $maxCount;
    }

    /**
     * Validate the attribute value.
     *
     * @param string $attribute
     * @param mixed $value
     * @param Closure $fail
     * @return void
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if ($this->collection->count() >= $this->maxCount) {
            $fail("You can only create {$this->maxCount} entries.");
        }
    }
}

