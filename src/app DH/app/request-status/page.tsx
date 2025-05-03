"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";

// Material-UI Imports
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  Button,
  IconButton,
  Collapse,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

// Define the shape of a request object
interface Request {
  id: string;
  companyName: string;
  requestDate: string;
  requestType: string;
  status: string;
}

export default function RequestStatusPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRequestId, setExpandedRequestId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"Newest" | "Oldest">("Newest");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const requestsPerPage = 5;

  // Mock data
  const mockRequests: Request[] = [
    {
      id: "876364",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      requestType: "Project",
      status: "Accepted",
    },
    {
      id: "876365",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      requestType: "Technical Review",
      status: "Accepted",
    },
    {
      id: "876366",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      requestType: "Project",
      status: "Accepted",
    },
    {
      id: "876367",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      requestType: "Project",
      status: "In Progress",
    },
    {
      id: "876368",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      requestType: "Technical Review",
      status: "Closed",
    },
    {
      id: "876369",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      requestType: "Technical Review",
      status: "Closed",
    },
    {
      id: "876370",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      requestType: "Technical Review",
      status: "Expired",
    },
    {
      id: "876371",
      companyName: "Adama Science and Technology University",
      requestDate: "2020-12-12",
      requestType: "Project",
      status: "Closed",
    },
  ];

  // Fetch data from API (using mock data for now)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/api/requests", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRequests(data.requests || mockRequests);
      } catch (error: any) {
        setError(error.message || "Failed to fetch data");
        setRequests(mockRequests);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Responsive handling with MUI
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Filter and sort requests
  const filteredRequests = requests
    .filter((request) =>
      request.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requestType.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.requestDate);
      const dateB = new Date(b.requestDate);
      return sortOrder === "Newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * requestsPerPage,
    currentPage * requestsPerPage
  );

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">Error: {error}</Typography>;
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "grey.100" }}>
      {/* Sidebar */}
      <Sidebar newRequestCount={mockRequests.length} />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, p: isMobile ? 2 : 3 }}>
        <Typography variant="h6" gutterBottom>Request Status</Typography>

        {/* Search and Sort */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, flexDirection: isMobile ? "column" : "row" }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Company Name, Types of Service"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: isMobile ? 2 : 0, width: isMobile ? "100%" : "auto" }}
          />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" sx={{ mr: 1 }}>Sort by:</Typography>
            <Select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "Newest" | "Oldest")}
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="Newest">Newest</MenuItem>
              <MenuItem value="Oldest">Oldest</MenuItem>
            </Select>
          </Box>
        </Box>

        {/* Request Table */}
        <TableContainer component={Paper}>
          <Table size={isMobile ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                {!isMobile && <TableCell>Company Name</TableCell>}
                <TableCell>Request Date</TableCell>
                <TableCell>Request Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
                {(isMobile || isTablet) && <TableCell />}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRequests.map((request) => (
                <React.Fragment key={request.id}>
                  <TableRow
                    sx={{
                      bgcolor:
                        request.status === "In Progress"
                          ? "red.100"
                          : request.status === "Expired"
                          ? "yellow.100"
                          : request.status === "Closed"
                          ? "green.100"
                          : "white",
                    }}
                  >
                    <TableCell>{`REQ/${request.id}`}</TableCell>
                    {!isMobile && <TableCell>{request.companyName}</TableCell>}
                    <TableCell>{new Date(request.requestDate).toLocaleDateString()}</TableCell>
                    <TableCell sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          bgcolor: request.requestType === "Project" ? "pink" : "green",
                          mr: 1,
                        }}
                      />
                      {request.requestType}
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          color:
                            request.status === "Accepted"
                              ? "green"
                              : request.status === "In Progress"
                              ? "red"
                              : request.status === "Closed"
                              ? "green"
                              : request.status === "Expired"
                              ? "orange"
                              : "grey",
                        }}
                      >
                        {request.status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Link href="/request-overview">
                        <Button variant="contained" size="small">View More</Button>
                      </Link>
                    </TableCell>
                    {(isMobile || isTablet) && (
                      <TableCell>
                        {(request.status === "In Progress" ||
                          request.status === "Expired" ||
                          request.status === "Closed") && (
                          <IconButton
                            onClick={() =>
                              setExpandedRequestId(expandedRequestId === request.id ? null : request.id)
                            }
                          >
                            {expandedRequestId === request.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                  {(isMobile || isTablet) && (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ p: 0 }}>
                        <Collapse in={expandedRequestId === request.id}>
                          <Box sx={{ p: 2, bgcolor: "grey.50" }}>
                            {isMobile && (
                              <Typography variant="body2" gutterBottom>
                                <strong>Company Name:</strong> {request.companyName}
                              </Typography>
                            )}
                            <Typography variant="body2" gutterBottom>
                              <strong>Request ID:</strong> REQ/{request.id}4534/54
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              <strong>Request Date:</strong> {new Date(request.requestDate).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              <strong>Priority:</strong> Review
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              <strong>Assigned Date:</strong> {new Date(request.requestDate).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              <strong>End Date:</strong> {new Date(request.requestDate).toLocaleDateString()}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              <strong>Request Status:</strong> {request.status}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                              <strong>Request Service:</strong>
                              <ul style={{ margin: 0, paddingLeft: 20 }}>
                                <li>Cyber Security Risk Assessment: 1,500,000</li>
                                <li>Strategic Level Risk Assessment: 1,500,000</li>
                                <li>Tactical Level Risk Assessment: 1,700,000</li>
                              </ul>
                            </Typography>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  )}
                  {!isMobile && !isTablet && expandedRequestId === request.id && (
                    <TableRow>
                      <TableCell colSpan={6} sx={{ bgcolor: "grey.50", p: 2 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                              <Typography variant="subtitle1" gutterBottom>Company Information</Typography>
                              <Typography variant="body2">Company Name: BAYDD Corporation</Typography>
                              <Typography variant="body2">Company Address: 123 Mekel Aldebay, Addis Ababa</Typography>
                              <Typography variant="body2">Company Phone: +251 - 965 - 661 - 679</Typography>
                              <Typography variant="body2">Company Email: barseneta20@gmail.com</Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                              <Typography variant="subtitle1" gutterBottom>Request Details</Typography>
                              <Typography variant="body2">Request ID: REQ/{request.id}4534/54</Typography>
                              <Typography variant="body2">Request Date: {new Date(request.requestDate).toLocaleDateString()}</Typography>
                              <Typography variant="body2">Priority: Review</Typography>
                              <Typography variant="body2">Assigned Date: {new Date(request.requestDate).toLocaleDateString()}</Typography>
                              <Typography variant="body2">End Date: {new Date(request.requestDate).toLocaleDateString()}</Typography>
                              <Typography variant="body2">Request Status: {request.status}</Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                              <Typography variant="subtitle1" gutterBottom>Request Service</Typography>
                              <Typography variant="body2">Cyber Security Risk Management Service</Typography>
                              <ul style={{ margin: 0, paddingLeft: 20 }}>
                                <li>Cyber Security Risk Assessment: 1,500,000</li>
                                <li>Strategic Level Risk Assessment: 1,500,000</li>
                                <li>Tactical Level Risk Assessment: 1,700,000</li>
                              </ul>
                              <Typography variant="body2" sx={{ mt: 1 }}>Cyber Security Management Service</Typography>
                              <ul style={{ margin: 0, paddingLeft: 20 }}>
                                <li>Governance Document Development: 1,500,000</li>
                                <li>Cyber Security Risk Quantification: 500,000</li>
                                <li>Tactical Level Risk Assessment: 700,000</li>
                              </ul>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                              <Typography variant="subtitle1" gutterBottom>Approval Status</Typography>
                              <Typography variant="body2">Director General Approval ✅</Typography>
                              <Typography variant="body2">Deputy Director Approval ✅</Typography>
                              <Typography variant="body2">Directorate Director Approval ✅</Typography>
                              <Typography variant="body2">Division Head Approval ✅</Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                              <Typography variant="subtitle1" gutterBottom>Request Letters</Typography>
                              <Typography variant="body2">
                                📄 Organizational Cyber Management Policy.pdf ⬇️
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                              <Typography variant="subtitle1" gutterBottom>Documents</Typography>
                              <Typography variant="body2">
                                📄 Organizational Cyber Management Policy.pdf ⬇️
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                              <Typography variant="subtitle1" gutterBottom>
                                Service Agreement and Payment Instructions
                              </Typography>
                              <Typography variant="body2">
                                📄 Letter to BAYDD Corporation.pdf ⬇️
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                              <Typography variant="subtitle1" gutterBottom>Closure Letter</Typography>
                              <Typography variant="body2">
                                📄 BAYDD Corporation Risk Management Report ⬇️
                              </Typography>
                            </Paper>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 2 }}>
                              <Typography variant="subtitle1" gutterBottom>Project</Typography>
                              <Typography variant="body2">
                                📄 BAYDD Corporation Risk Management Report ⬇️
                              </Typography>
                            </Paper>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            {"<"}
          </Button>
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              sx={{
                bgcolor: currentPage === index + 1 ? "primary.main" : "transparent",
                color: currentPage === index + 1 ? "white" : "black",
                mx: 0.5,
              }}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            {">"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}