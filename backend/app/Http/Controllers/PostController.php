<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        // Add pagination and eager load the author to prevent N+1 queries
        $posts = Post::with('author')->latest()->paginate(15);
        
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:posts',
            'content' => 'required|string',
            'is_published' => 'boolean',
        ]);
        
        // Secure creation via relationship. user_id is assigned automatically.
        $post = $request->user()->posts()->create($validated);

        return response()->json([
            'message' => 'Post created successfully!',
            'data' => $post,
        ], 201);
    }

    public function show(Post $post) 
    {
        $post->load('author'); // Load relationship for the single post view
        return response()->json($post);
    }

    public function update(Request $request, Post $post) {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'slug' => 'sometimes|required|string|unique:posts,slug,' . $post->id,
            'content' => 'sometimes|required|string',
            'is_published' => 'sometimes|boolean',
        ]);

        $post->update($validated);

        return response()->json([
            'message' => 'Post updated successfully!',
            'data' => $post,
        ]);
    }

    public function destroy(Post $post) {
        $post->delete();

        return response()->json([
            'message' => 'Post deleted successfully!',
        ]);
    }
}
