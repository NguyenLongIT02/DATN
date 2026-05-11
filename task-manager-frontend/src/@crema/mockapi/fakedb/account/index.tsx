import {AccountDataType} from '@crema/types/models/account';

export const accountData: AccountDataType = {
  member: [
    {
      id: 1,
      title: 'Your Twitter',
      image: '/assets/images/avatar/A4.jpg',
      name: '@Johndeuo',
      email: '',
    },
    {
      id: 2,
      title: 'Your Github',
      image: '/assets/images/avatar/A6.jpg',
      name: '@Johndeuo',
      email: '',
    },
    {
      id: 3,
      title: 'Your Facebook',
      image: '/assets/images/avatar/A2.jpg',
      name: 'King Rox',
      email: '',
    },
    {
      id: 4,
      title: 'Your Google',
      image: '/assets/images/avatar/A14.jpg',
      name: '',
      email: 'johndeuo@gmail.com',
    },
    {
      id: 5,
      title: 'Your Github',
      image: '/assets/images/avatar/A6.jpg',
      name: '@Johndeuo',
      email: '',
    },
    {
      id: 6,
      title: 'Your Facebook',
      image: '/assets/images/avatar/A2.jpg',
      name: 'King Rox',
      email: '',
    },
  ],
  notification: {
    activity: [
      {
        id: 1,
        title: 'Gửi email cho tôi khi có người bình luận về bài viết của tôi',
        defaultChecked: true,
      },
      {
        id: 2,
        title: 'Gửi email cho tôi khi có người trả lời biểu mẫu của tôi',
        defaultChecked: true,
      },
      {
        id: 3,
        title: 'Gửi email cho tôi khi có người trả lời yêu cầu của tôi',
        defaultChecked: false,
      },
    ],
    application: [
      {
        id: 1,
        title: 'Tin tức và thông báo',
        defaultChecked: false,
      },
      {
        id: 2,
        title: 'Cập nhật sản phẩm hàng tuần',
        defaultChecked: true,
      },
      {
        id: 3,
        title: 'Tóm tắt blog hàng tuần',
        defaultChecked: false,
      },
    ],
  },
};

export default accountData;
