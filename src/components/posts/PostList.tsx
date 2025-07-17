import React, { useState, useEffect } from 'react';
import { Search, ChevronLeft, ChevronRight, Loader2, AlertCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardContent, CustomCardDescription } from '@/components/ui/custom-card';
import { Badge } from '@/components/ui/badge';
import { Post, User as UserType, PaginationInfo } from '@/types';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pagination, setPagination] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 6,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch posts and users in parallel
      const [postsResponse, usersResponse] = await Promise.all([
        fetch('https://jsonplaceholder.typicode.com/posts'),
        fetch('https://jsonplaceholder.typicode.com/users'),
      ]);

      if (!postsResponse.ok || !usersResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const [postsData, usersData] = await Promise.all([
        postsResponse.json(),
        usersResponse.json(),
      ]);

      setPosts(postsData);
      setUsers(usersData);
      
      // Update pagination
      setPagination(prev => ({
        ...prev,
        totalItems: postsData.length,
        totalPages: Math.ceil(postsData.length / prev.itemsPerPage),
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedPosts = filteredPosts.slice(
    (pagination.currentPage - 1) * pagination.itemsPerPage,
    pagination.currentPage * pagination.itemsPerPage
  );

  const totalFilteredPages = Math.ceil(filteredPosts.length / pagination.itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, currentPage: newPage }));
    // Scroll to top of posts section
    document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' });
  };

  const getUserById = (userId: number) => {
    return users.find(user => user.id === userId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to first page
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <CustomCard variant="default" className="max-w-md text-center">
          <CustomCardContent className="p-6">
            <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Failed to Load Posts</h3>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={fetchData} variant="outline">
              Try Again
            </Button>
          </CustomCardContent>
        </CustomCard>
      </div>
    );
  }

  return (
    <section id="posts" className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Latest Posts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore articles and insights from our community. 
            Search through posts and discover interesting content.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {searchQuery ? (
              <>Showing {filteredPosts.length} results for "{searchQuery}"</>
            ) : (
              <>Showing {filteredPosts.length} posts</>
            )}
          </p>
          <Badge variant="secondary">
            Page {pagination.currentPage} of {totalFilteredPages}
          </Badge>
        </div>

        {/* Posts Grid */}
        {paginatedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedPosts.map((post, index) => {
              const author = getUserById(post.userId);
              return (
                <CustomCard
                  key={post.id}
                  variant="elevated"
                  className="h-full animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CustomCardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {author?.name || 'Unknown Author'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          @{author?.username || 'unknown'}
                        </p>
                      </div>
                    </div>
                    <CustomCardTitle className="text-lg line-clamp-2">
                      {post.title}
                    </CustomCardTitle>
                  </CustomCardHeader>
                  <CustomCardContent>
                    <CustomCardDescription className="line-clamp-3">
                      {post.body}
                    </CustomCardDescription>
                  </CustomCardContent>
                </CustomCard>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No posts found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search query to find what you're looking for.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalFilteredPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalFilteredPages) }, (_, i) => {
                let pageNum;
                if (totalFilteredPages <= 5) {
                  pageNum = i + 1;
                } else if (pagination.currentPage <= 3) {
                  pageNum = i + 1;
                } else if (pagination.currentPage >= totalFilteredPages - 2) {
                  pageNum = totalFilteredPages - 4 + i;
                } else {
                  pageNum = pagination.currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === pagination.currentPage ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className="w-10 h-10"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === totalFilteredPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PostList;