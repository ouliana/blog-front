import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  test('<BlogForm /> calls the event handler it received as props with the right details', async () => {
    const user = userEvent.setup();
    const crateBlogHandle = jest.fn();

    const blog = {
      title: 'testing title...',
      author: 'testing author...',
      url: 'testing url...',
    };

    render(<BlogForm crateBlogHandle={crateBlogHandle} />);

    const inputTitle = screen.getByPlaceholderText('title');
    const inputAuthor = screen.getByPlaceholderText('author');
    const inputUrl = screen.getByPlaceholderText('url');

    const sendButton = screen.getByText('save');

    await user.type(inputTitle, blog.title);
    await user.type(inputAuthor, blog.author);
    await user.type(inputUrl, blog.url);

    await user.click(sendButton);

    console.log('content: ', crateBlogHandle.mock.calls[0][0]);

    expect(crateBlogHandle.mock.calls).toHaveLength(1);
    expect(crateBlogHandle.mock.calls[0][0]).toEqual(blog);
  });
});
