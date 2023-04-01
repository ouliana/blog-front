import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;
  let handleLikesUpdate;
  beforeEach(() => {
    const blog = {
      author: `Author's Name`,
      title: `Blog's title`,
      url: 'https://www.someurl/',
      likes: 0,
      user: {
        name: 'Ouliana',
        userName: 'ouliana',
        id: 1,
      },
    };
    handleLikesUpdate = jest.fn();

    container = render(
      <Blog
        key={blog.id}
        blog={blog}
        handleLikesUpdate={handleLikesUpdate}
        // usersOwnBlog={user.username === blog.user.username}
        // handleRemove={handleRemoveBlog}
      />
    ).container;
  });

  test(`renders the blog's title and author`, () => {
    var element = screen.getByText(`Author's Name`, { exact: false });
    expect(element).toBeDefined();

    element = screen.getByText(`Blog's title`, { exact: false });
    expect(element).toBeDefined();
  });

  test(`does not display the blog's url and likes number`, () => {
    const div = container.querySelector('.blogDetails');
    expect(div).toHaveStyle('display: none');
  });

  test('after clicking the button displays details', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('view');

    await user.click(button);

    const div = container.querySelector('.blogDetails');
    expect(div).not.toHaveStyle('display: none');
  });

  test('if the like button is clicked twice, the event handler is called twice', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('like');

    await user.click(button);
    await user.click(button);

    expect(handleLikesUpdate.mock.calls).toHaveLength(2);
  });
});
