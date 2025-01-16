export async function getTableData(page = 1, perPage = 10, searchKey = "") {
    const data = [
        {
            name: "John Doe",
            manager_email: "john.doe@example.com",
            enps: 75,
            max_score: 100,
            date_of_joining: "2021-01-15",
            tenure_in_current_company: 3,
            total_attrition: 5,
            tenure: 6,
        },
        {
            name: "Jane Smith",
            manager_email: "jane.smith@example.com",
            enps: 85,
            max_score: 100,
            date_of_joining: "2019-05-20",
            tenure_in_current_company: 4,
            total_attrition: 3,
            tenure: 5,
        },
        {
            name: "Sam Wilson",
            manager_email: "sam.wilson@example.com",
            enps: 80,
            max_score: 100,
            date_of_joining: "2020-08-10",
            tenure_in_current_company: 2,
            total_attrition: 2,
            tenure: 3,
        },
    ];

    const filteredData = data.filter(
        (item) =>
            item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
            item.manager_email.toLowerCase().includes(searchKey.toLowerCase())
    );

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const startIndex = (page - 1) * perPage;
    const paginatedData = filteredData.slice(startIndex, startIndex + perPage);

    const columns = [
        { label: "Name", data_key: "name", is_fixed: true, is_sorting: true },
        { label: "Manager Email", data_key: "manager_email", is_fixed: false, is_sorting: false },
        { label: "ENPS", data_key: "enps", is_fixed: false, is_sorting: true },
        { label: "Max Score", data_key: "max_score", is_fixed: false, is_sorting: true },
        { label: "Date of Joining", data_key: "date_of_joining", is_fixed: false, is_sorting: true },
        { label: "Tenure in Current Company", data_key: "tenure_in_current_company", is_fixed: false, is_sorting: true },
        { label: "Total Attrition", data_key: "total_attrition", is_fixed: false, is_sorting: false },
        { label: "Tenure", data_key: "tenure", is_fixed: false, is_sorting: true },
    ];

    return {
        columns,
        data: paginatedData,
        totalItems,
        totalPages
    };
}
