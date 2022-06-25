import React, { useState, cloneElement } from "react";
import { styled, alpha } from "@mui/material/styles";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Button,
    MenuItem,
    Menu,
    IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "right",
        }}
        {...props}
    />
))(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === "light"
                ? "rgb(55, 65, 81)"
                : theme.palette.grey[300],
        boxShadow:
            "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
        "& .MuiMenu-list": {
            padding: "4px 0",
        },
        "& .MuiMenuItem-root": {
            "& .MuiSvgIcon-root": {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            "&:active": {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity
                ),
            },
        },
    },
}));

const MenuDropdown = (props) => {
    const { dropdownButton } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const itemClick = (e, childOnClick) => {
        handleClose();
        childOnClick(e);
    };
    // Source: https://mui.com/material-ui/react-menu/

    const controlsOpenStatus = () => {
        return open ? "statusMenu" : undefined;
    };

    const menuExpandedStatus = () => {
        return open ? "true" : undefined;
    };

    const clonedButton = cloneElement(
        dropdownButton,
        {
            "aria-controls": controlsOpenStatus,
            "aria-haspopup": "true",
            "aria-expanded": menuExpandedStatus,
            onClick: (e) => handleMenuClick(e),
        },
        dropdownButton.props.children
    );

    return (
        <div>
            {clonedButton}
            <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {React.Children.map(props.children, (child) => {
                    return cloneElement(
                        child,
                        { onClick: (e) => itemClick(e, child.props.onClick) },
                        child.props.children
                    );
                })}
            </StyledMenu>
        </div>
    );
};

export default MenuDropdown;
