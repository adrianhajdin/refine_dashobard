import React, { useContext } from 'react';
import { useGetIdentity } from '@pankod/refine-core';
import {
  AppBar,
  // IconButton,
  Avatar,
  Stack,
  Toolbar,
  Typography,
} from '@pankod/refine-mui';
// import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

// import { ColorModeContext } from 'contexts';

export const Header: React.FC = () => {
  // const { mode, setMode } = useContext(ColorModeContext);

  const { data: user } = useGetIdentity();
  const showUserInfo = user && (user.name || user.avatar);

  return (
    // CHANGE: header color & elevation
    <AppBar color="default" position="sticky" elevation={0} sx={{ background: '#FCFCFC' }}>
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          {/* <IconButton
            onClick={() => {
              setMode();
            }}
          >
            {mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton> */}
          {showUserInfo && (
            <Stack direction="row" gap="12px" alignItems="center" justifyContent="center">
              {user.avatar && <Avatar src={user?.avatar} alt={user?.name} />}

              {user.name && (
                // CHANGE: Display user info on the header
                <Stack direction="column">
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#11142D' }}>{user?.name}</Typography>
                  <Typography sx={{ fontSize: 12, color: '#808191' }}>{user?.email}</Typography>
                </Stack>
              )}
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
