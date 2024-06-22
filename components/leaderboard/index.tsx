import { useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';

import { CopyIcon, UserIcon, CoinIcon, LinkIcon } from '@/public/icons';
import { formatNumber } from '../table/row';
import LBClickAnimation from '../click-animation';
import LBTable from '../table';
import { leaderboardData } from '@/views/token-detail/dummy';

const dummyUser: ILBLeaderboardUser = {
  name: 'Choco',
  avatar: 'https://res.cloudinary.com/dxnd4k222/image/upload/fl_preserve_transparency/v1718723895/Avatar_khczwg.jpg',
  type: 'farcaster',
  position: 1,
};

const LBLeaderboard = ({ variant = 'private' }: ILBLeaderboard) => {
  const [user, setUser] = useState<ILBLeaderboardUser>();
  const actions = [
    {
      type: 'inactive',
      show: true,
      items: [
        {
          icon: <UserIcon />,
          text: `${(40_678).toLocaleString()} Participants`,
        },
        {
          icon: <CoinIcon />,
          text: `${formatNumber(22_700_000).toUpperCase()} Total Points`,
        },
      ],
    },
    {
      type: 'active',
      show: variant === 'private',
      items: [
        {
          icon: <LinkIcon />,
          text: 'Public link',
        },
        {
          icon: <CopyIcon />,
          text: 'Embed',
        },
      ],
    },
  ];

  const handleFindUser = () => setUser(dummyUser);

  return (
    <div
      className={classNames('self-stretch flex-1 flex flex-col gap-6 relative min-h-full overflow-auto', {
        'p-6 rounded-lg border border-primary-50': variant === 'public',
      })}>
      <h1 className="text-primary-650 text-[24px] leading-[38px] font-medium">Leaderboard</h1>

      <div className="flex items-center justify-between flex-wrap gap-4">
        {actions.map(({ type, items, show }) => (
          <div key={type} className="flex items-center gap-2 flex-wrap">
            {items.map(({ icon, text }) => (
              <LBClickAnimation
                key={text}
                className={classNames('px-3.5 py-2.5 rounded-lg border border-primary-1950 flex items-center gap-1 bg-white shadow-table-cta', {
                  'pointer-events-none': type === 'inactive',
                  hidden: !show,
                })}>
                {icon}
                <span className="text-primary-2000 text-sm font-medium px-0.5">{text}</span>
              </LBClickAnimation>
            ))}
          </div>
        ))}
      </div>

      <div className="max-h-[350px] overflow-auto">
        <LBTable data={leaderboardData} variant="secondaryAlt" />
      </div>

      <div className="min-w-full absolute bottom-0 left-0 px-[53px] pb-[30px] flex items-center justify-center">
        <div className="w-full px-3.5 py-2.5 rounded-lg border border-primary-1950 flex items-center justify-between bg-white shadow-landing-nav">
          <span className="px-4 py-2.5 rounded-lg border border-primary-1950 shadow-table-cta">#{user ? user.position : '??'}</span>

          <>
            {user && (
              <div className="flex items-center gap-1 py-1 pl-1 pr-2 justify-center bg-primary-200 rounded-full">
                <Image src={user.avatar} alt="avatar" width={500} height={500} className="w-4 h-4 object-cover rounded-full" />
                <span className="text-primary-250 text-[14px] leading-[21px] font-medium">{user.name}</span>{' '}
              </div>
            )}

            {!user && (
              <div className="flex items-center justify-center gap-1.5">
                <CoinIcon />
                <span className="text-primary-2000 text-sm font-medium">Where are you on the leaderboard?</span>
              </div>
            )}
          </>

          <LBClickAnimation onClick={handleFindUser} className={classNames('px-3.5 py-2.5 rounded-lg border border-primary-1950 shadow-table-cta', { 'pointer-events-none': user })}>
            <span className="text-primary-2000 text-sm font-medium">{user ? "You're on the table" : 'Check your score'}</span>
          </LBClickAnimation>
        </div>
      </div>
    </div>
  );
};

export default LBLeaderboard;
