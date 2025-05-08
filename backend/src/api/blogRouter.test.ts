import { readAll, getPost } from './blogRouterMethods/read';
import deletePost from './blogRouterMethods/delete';
import { BlogBlock, writeQuery } from './blogRouterMethods/utils';
import createPost from './blogRouterMethods/create';
import editPost from './blogRouterMethods/edit';
import { Client, QueryResult } from 'pg';

//variables
const elements = [
    {
        blockorder: 1,
        blocktype: 'text',
        blockcontent: 'hello'
    },
    {
        blockorder: 2,
        blocktype: 'text',
        blockcontent: 'world'
    }
];
const id = 1;
const title = 'A strange blog post';
const tags = ["Something", "Great", "Is", "Going", "On"];
const headerImage = "https://res.cloudinary.com/dlkofkgto/image/upload/v1744931924/your_blog_uploads/yywcvoxdyzrqbxqm197s.jpg";
const date = null;

const reqBody = {
    elements: elements,
    title: title,
    headerImage: headerImage,
    tags: tags,
    id: id
}

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
test('Writes an insert statement for a blog post, returns a query and an array of params', () => {
    const result = writeQuery(elements, title, id, tags, headerImage, date)
    expect(result.query).toBe('INSERT INTO blog (headerimage, tags, blockorder, islive, blogdate, blogid, blockcontent, blogtitle, blocktype) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9), ($10, $11, $12, $13, $14, $15, $16, $17, $18)')
    expect(result.params).toEqual([
        'https://res.cloudinary.com/dlkofkgto/image/upload/v1744931924/your_blog_uploads/yywcvoxdyzrqbxqm197s.jpg',
        '["Something","Great","Is","Going","On"]',
        1,
        true,
        expect.any(Date), // cause the date is generated in the function itself
        1,
        'hello',
        'A strange blog post',
        'text',
        'https://res.cloudinary.com/dlkofkgto/image/upload/v1744931924/your_blog_uploads/yywcvoxdyzrqbxqm197s.jpg',
        '["Something","Great","Is","Going","On"]',
        2,
        true,
        expect.any(Date),
        1,
        'world',
        'A strange blog post',
        'text'
    ])
    expect(result.params.length).toBeGreaterThan(0);
})

// Create
test('Create a blog post', async () => {
    const mockQuery = jest.fn().mockResolvedValue({
        rowCount: 1,
        rows: []
    } as unknown as QueryResult);
    

    const mockClient = {
        query: mockQuery
    } as unknown as Client;

    const testId = 1;

    const result = await createPost(reqBody, mockClient, testId);
    expect(mockQuery).toHaveBeenCalled();
    const firstCall = mockQuery.mock.calls[0][0];
    expect(firstCall).toContain('INSERT INTO blog');
    const passedParams = mockQuery.mock.calls[0][1];
    expect(passedParams).toBeDefined();
    expect(passedParams.length).toBeGreaterThan(0);
    expect(passedParams).toEqual(expect.arrayContaining([
        expect.stringContaining('cloudinary.com'),
        expect.stringContaining('["Something","Great","Is","Going","On"]'),
        1,
        true,
        expect.any(Date),
        1,
        'hello',
        title,
        'text',
        expect.stringContaining('cloudinary.com'),
        expect.stringContaining('["Something","Great","Is","Going","On"]'),
        2,
        true,
        expect.any(Date),
        1,
        'world',
        title,
        'text'
    ]));
    expect(result).toEqual([]);
});

// Edit
test('Edit a blog post', async () => {
    const mockQuery = jest.fn().mockResolvedValue({
        rowCount: 1,
        rows: []
    } as unknown as QueryResult);
    const mockClient = {
        query: mockQuery
    } as unknown as Client;
    const result = await editPost(reqBody, mockClient);
    expect(mockQuery).toHaveBeenCalled();
    const firstCall = mockQuery.mock.calls[0][0];
    expect(firstCall).toContain('DELETE FROM blog WHERE blogid = 1');
    const secondCall = mockQuery.mock.calls[1][0]
    const thirdCall = mockQuery.mock.calls[1][1]
    expect(secondCall).toBe("INSERT INTO blog (headerimage, tags, blockorder, islive, blogdate, blogid, blockcontent, blogtitle, blocktype) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9), ($10, $11, $12, $13, $14, $15, $16, $17, $18)")
    expect(thirdCall).toBeDefined()
    expect(thirdCall).toBeInstanceOf(Array);
    expect(thirdCall[2]).toBe(1);
    expect(thirdCall[4]).toEqual(expect.any(Date))
    expect(result).toEqual([]);
});