<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
  public function show(User $user, $model)
  {
    return $user->id  === $model->user_id;
  }

  public function store(User $user, $model)
  {
    return $user->id === $model->user_id;
  }

  public function edit(User $user, $model)
  {
    return $user->id === $model->user_id;
  }

  public function delete(User $user, $model)
  {
    return $user->id === $model->user_id;
  }
}
