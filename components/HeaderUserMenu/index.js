/** @jsxRuntime classic */
/** @jsx jsx */
import {jsx} from 'theme-ui';
import {useUser} from 'components/UserContext';

const HeaderUserMenu = () => {
  const {network, account, disconnect} = useUser();

  return (
    <div sx={{width: '100%', color: 'black'}}>
      <div sx={{px: 3, py: 2}}>
        <div
          sx={{
            mb: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <div
            sx={{
              mr: 2,
              width: '10px',
              height: '10px',
              borderRadius: 5,
              bg: 'green'
            }}
          />
          <div sx={{fontSize: 1, fontWeight: '500'}}>{network} network</div>
        </div>
        <div sx={{fontSize: 0}}>{account}</div>
      </div>
      <div
        onClick={disconnect}
        sx={{
          cursor: 'pointer',
          borderTop: 'solid 1px',
          borderColor: '#dbdbdb',
          fontSize: 1,
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        Disconnect
      </div>
    </div>
  );
};

export default HeaderUserMenu;
