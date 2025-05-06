import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isAdmin = currentUser?.email === 'admin@bookadvisor.com';

  useEffect(() => {
    async function fetchBookAndComments() {
      try {
        // Fetch book details
        const bookDoc = await getDoc(doc(db, 'books', id));
        if (!bookDoc.exists()) {
          throw new Error('Book not found');
        }
        setBook({ id: bookDoc.id, ...bookDoc.data() });

        // Fetch comments
        const commentsQuery = query(
          collection(db, 'comments'),
          where('bookId', '==', id),
          orderBy('createdAt', 'desc')
        );
        const commentsSnapshot = await getDocs(commentsQuery);
        const commentsData = commentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setComments(commentsData);
      } catch (error) {
        setError('Failed to fetch book details: ' + error.message);
      }
      setLoading(false);
    }

    fetchBookAndComments();
  }, [id]);

  async function handleAddComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const commentData = {
        bookId: id,
        userId: currentUser.uid,
        userEmail: currentUser.email,
        content: newComment,
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'comments'), commentData);
      setComments([{ ...commentData, id: 'temp' }, ...comments]);
      setNewComment('');
    } catch (error) {
      setError('Failed to add comment: ' + error.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
              <p className="mt-2 text-gray-600">{book.description}</p>
              <div className="mt-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {book.targetAudience}
                </span>
              </div>
            </div>
            {isAdmin && (
              <button
                onClick={() => navigate(`/edit-book/${id}`)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Edit Book
              </button>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Comments</h2>
          
          {currentUser && (
            <form onSubmit={handleAddComment} className="mb-6">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
                placeholder="Write a comment..."
                required
              />
              <button
                type="submit"
                className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Add Comment
              </button>
            </form>
          )}

          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b border-gray-200 pb-4">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-900">{comment.userEmail}</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail; 