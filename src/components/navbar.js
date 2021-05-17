import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, ActivityIndicator, NavBar, Popover, Icon } from 'antd-mobile';

const data = [
  {
    value: '1',
    label: 'Sites',
    path: '/sites'
  }
];

const Item = Popover.Item;

const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

export class Navbar extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      initData: '',
      showMenu: false,
    }
  }

  onMenuChange = (value) => {
    data.forEach((dataItem) => {
      if (dataItem.value === value[0]) {
        return <Link to={value.path}></Link>
      }
    })
  }

  onMenuClickHandle = (e) => {
    e.preventDefault();// Fix event propagation on Android
    this.setState({
      showMenu: !this.state.showMenu,
    });
    // mock for async data loading
    if (!this.state.initData) {
      setTimeout(() => {
        this.setState({
          initData: data,
        })
      }, 200);
    }
  };

  onMaskClick = () => {
    this.setState({
      showMenu: false,
      showSearchBar: false,
    });
  }

  render() {
    const { initData, showMenu } = this.state;
    const menuEl = (
      <Menu
        className="single-foo-menu"
        data={initData}
        value={['1']}
        level={1}
        onChange={this.onMenuChange}
        height={document.documentElement.clientHeight * 0.6}
      />
    );

    const loadingEl = (
      <div style={{ position: 'absolute', width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </div>
    )

    return (
      <div className={showMenu ? 'single-menu-active' : ''}>
        <div>
          <NavBar
            className="single-top-nav-bar"
            icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" onClick={this.onMenuClickHandle} />}
            rightContent={
              <Popover mask
                className="menu-mask"
                overlayClassName="fortest"
                overlayStyle={{ color: 'currentColor' }}
                overlay={[
                  (<Item key="4" value="scan" icon={myImg('tOtXhkIWzwotgGSeptou')} data-seed="logId">Scan</Item>),
                  (<Item key="5" value="special" icon={myImg('PKAgAqZWJVNwKsAJSmXd')} style={{ whiteSpace: 'nowrap' }}>My Qrcode</Item>),
                  (<Item key="6" value="button ct" icon={myImg('uQIYTFeRrjPELImDRrPt')}>
                    <span style={{ marginRight: 5 }}>Help</span>
                  </Item>),
                ]}
                align={{
                  overflow: { adjustY: 0, adjustX: 0 },
                  offset: [-10, 0],
                }}
                onVisibleChange={this.handleVisibleChange}
                onSelect={this.onSelect}
              >
                <div style={{
                  height: '100%',
                  padding: '0 15px',
                  marginRight: '-15px',
                  display: 'flex',
                  alignItems: 'center',
                }}
                >
                  <Icon type="ellipsis" />
                </div>
              </Popover>
            }
          >
            Scheduling
          </NavBar>
        </div>
        {showMenu ? initData ? menuEl : loadingEl : null}
        {showMenu ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
      </div>
    )
  }
}