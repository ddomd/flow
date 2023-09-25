<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;

use App\Models\Board;
use App\Models\Column;
use App\Models\Subtask;
use App\Models\Tag;
use App\Models\Task;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Board::class => UserPolicy::class,
        Column::class => UserPolicy::class,
        Task::class => UserPolicy::class,
        Subtask::class => UserPolicy::class,
        Tag::class => UserPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        //
    }
}
