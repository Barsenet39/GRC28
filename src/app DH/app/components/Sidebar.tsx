import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Box,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import ReplayIcon from "@mui/icons-material/Replay";

interface SidebarProps {
  newRequestCount: number;
}

export default function Sidebar({ newRequestCount }: SidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = useState(!isMobile);
  const router = useRouter();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Request Status", icon: <RequestPageIcon />, path: "/request-status" },
    { text: "New Requests", icon: <AssignmentIcon />, path: "/new-requests", badge: newRequestCount },
    { text: "Returned Requests", icon: <ReplayIcon />, path: "/returned-requests" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    { text: "Logout", icon: <LogoutIcon />, path: "/logout" },
  ];

  const SidebarContent = (
    <Box sx={{ width: 250, bgcolor: "primary.main", height: "100%", color: "white" }}>
      <Box sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h6">My App</Typography>
        {isMobile && (
          <IconButton onClick={toggleDrawer} sx={{ color: "white" }}>
            <MenuIcon />
          </IconButton>
        )}
      </Box>
      <Divider sx={{ bgcolor: "white" }} />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => {
              router.push(item.path);
              if (isMobile) setOpen(false);
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
            {item.badge && (
              <Typography variant="caption" sx={{ bgcolor: "red", borderRadius: "50%", px: 1, color: "white" }}>
                {item.badge}
              </Typography>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return isMobile ? (
    <>
      <IconButton onClick={toggleDrawer} sx={{ position: "fixed", top: 10, left: 10, zIndex: 1200 }}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        {SidebarContent}
      </Drawer>
    </>
  ) : (
    <Box sx={{ flexShrink: 0 }}>{SidebarContent}</Box>
  );
}