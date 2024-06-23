import { ReactElement, ReactNode } from 'react';
import { ModalType } from './modals/types';
import { Network } from '../button/types';

interface INavLink {
  title: string;
  icon: ReactElement;
  href: string;
  isActive: boolean;
  comingSoon?: boolean;
}

type INavLinks = INavLink[];

interface INavAction {
  text?: string;
  variant: ModalType;
  onClick: () => void;
  isVisibile?: boolean;
}

type INavActions = INavAction[];

interface MenuProps {
  menuOpen: boolean;
  links: INavLinks;
  actionItems: INavActions;
}

interface NavLinkProps {
  title: string;
  icon: ReactNode;
  href: string;
  isActive: boolean;
  fullWidth?: boolean;
  comingSoon?: boolean;
}

interface NavActionProps {
  text?: string;
  onClick: () => void;
  isMobile?: boolean;
  variant?: 'network' | 'account' | 'wallet';
  isVisibile?: boolean;
}

export type { INavLinks, INavLink, INavActions, INavAction, MenuProps, NavLinkProps, NavActionProps };
