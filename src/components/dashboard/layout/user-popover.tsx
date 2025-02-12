import * as React from 'react';
import { useState, useEffect } from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { User as UserIcon } from '@phosphor-icons/react/dist/ssr/User';
import { jwtDecode } from 'jwt-decode'; // Import de jwtDecode
import { paths } from '@/paths';

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UserPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {
  const [user, setUser] = useState<{ nom?: string; prenom?: string; email?: string; photo?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login'); // Rediriger vers la page de connexion si pas de token
      } else {
        try {
          const decoded: any = jwtDecode(token); // Décoder le token
          setUser({ 
            nom: decoded.nom, 
            prenom: decoded.prenom, 
            email: decoded.email, 
            photo: decoded.photo || '/default-avatar.png' // Image par défaut si absente
          });
        } catch (error) {
          console.error('Token invalide', error);
          localStorage.removeItem('token'); // Nettoyer le token invalide
          router.push('/login');
        }
      }
      setLoading(false);
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/auth/sign-in');
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {loading ? (
          <Typography variant="subtitle1">Chargement...</Typography>
        ) : (
          <>
            {/* Avatar utilisateur */}
            <Avatar 
              src={user?.photo} 
              alt="Photo de profil" 
              sx={{ width: 56, height: 56, mb: 1 }} 
            />
            {/* Nom et email */}
            <Typography variant="subtitle1">
              {user?.nom + ' ' + user?.prenom || 'Utilisateur'}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {user?.email || 'Email non disponible'}
            </Typography>
          </>
        )}
      </Box>
      <Divider />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem component={RouterLink} href={paths.dashboard.settings} onClick={onClose}>
          <ListItemIcon>
            <GearSixIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem component={RouterLink} href={paths.dashboard.account} onClick={onClose}>
          <ListItemIcon>
            <UserIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <SignOutIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
