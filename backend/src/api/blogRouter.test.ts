import { readAll, getPost } from './blogRouterMethods/read';
import deletePost from './blogRouterMethods/delete';
import { Client, QueryResult } from 'pg';

// Read All
test('returns an array of objects', async () => {
    const mockQuery = jest.fn().mockResolvedValue({
        rows: [
            {
                headerimage: 'image1.png',
                tags: '["news"]',
                blockorder: 0,
                islive: true,
                blogdate: '2024-01-01',
                blogid: 1,
                blockcontent: 'Welcome!',
                blogtitle: 'First Post',
            },
        ]
    } as QueryResult);

    const mockClient = {
        query: mockQuery
    } as unknown as Client;


    // Act
    const result = await readAll(mockClient);

    // Assert
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty('blogid', 1);
})

// Get Post
test('returns a single blog post', async () => {
    const mockQuery = jest.fn().mockResolvedValue({
        rows: [
            {
                headerimage: 'image1.png',
                tags: '["news"]',
                blockorder: 0,
                islive: true,
                blogdate: '2024-01-01',
                blogid: 1,
                blockcontent: 'Welcome!',
                blogtitle: 'First Post',
            },
        ]
    } as QueryResult)

    const mockClient = {
        query: mockQuery
    } as unknown as Client;

    const testId = 1;

    const result = await getPost(mockClient, testId)

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty('blogid', 1);
})

// Delete
test('deletes a post', async () => {
    const mockQuery = jest.fn().mockResolvedValue({ 
        rowCount: 1, 
        rows: [] 
    } as unknown as QueryResult);

    const mockClient = {
        query: mockQuery
    } as unknown as Client;

    const testId = 1;

    const result = await deletePost(mockClient, testId);

    // Assert that query was called with the correct SQL
    expect(mockQuery).toHaveBeenCalledWith(expect.stringContaining(`DELETE`));
    expect(mockQuery).toHaveBeenCalledWith(expect.stringContaining(`WHERE blogid = ${testId}`));

    // Assert that the function returned the result of query
    expect(result).toHaveProperty('rowCount', 1);
});

// Write Query
