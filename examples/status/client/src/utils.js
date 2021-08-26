export const getStatusColor = (status, colors = {}) =>
{
    const num = 500
    return status === "Operational" || status === "Resolved"
    ? colors?.green[num] || "green"
    : status === "Degraded Performance"
    ? colors?.yellow[num] || "yellow"
    : status === "Partial Outage" || status === "Identified"
    ? colors?.orange[num] || "orange"
    : status === "Monitoring"
    ? colors.blue[num] || "blue"
    : colors.red[num] || "red";
}
  
