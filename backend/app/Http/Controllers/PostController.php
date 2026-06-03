<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        $post = Post::all();
        return response()->json([
            'data' => $post
        ]);
    }

    public function store(Request $request)
    {
        // Here you would typically handle the incoming request data,
        // validate it, and save it to the database.
        // For this example, we'll just return a success message.
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:posts',
            'content' => 'required|string',
            'is_published' => 'boolean',
        ]);
        
        $post = Post::create($validated);

        return response()->json([
            'message' => 'Post created successfully!',
            'data' => $post,
        ], 201);
    }
}
