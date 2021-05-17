import React from 'react';
import { SearchBar, Button, WhiteSpace, WingBlank, Menu, ActivityIndicator, NavBar, Popover, Icon } from 'antd-mobile';

export default class SearchBarExample extends React.Component {
    state = {
        value: '美食',
        showSearchBar: false,
    };
    componentDidMount() {
        this.autoFocusInst.focus();
    }
    onChange = (value) => {
        this.setState({ value });
    };
    clear = () => {
        this.setState({ value: '' });
    };
    handleClick = () => {
        this.manualFocusInst.focus();
    };

    onSearchClickHandle = (e) => {
        e.preventDefault();// Fix event propagation on Android
        this.setState({
            showSearchBar: !this.state.showSearchBar,
        });
    };

    onMaskClick = () => {
        this.setState({
            showSearchBar: false,
        });
    }

    render() {
        const { initData, showSearchBar } = this.state;
        return (
            <div>
                <SearchBar placeholder="Search" maxLength={8} />
            </div>
        );
    }
}
