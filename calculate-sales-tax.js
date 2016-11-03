var SALES_TAX_RATES = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};


var COMPANIES_SALES_DATA = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];


function calculateSales (salesData) {
  var salesTotal = [];
  for (var i = 0; i < salesData.length; i++) {
    var total = salesData[i].sales.reduce(function(prev, curr) {
      return prev + curr;
    }, 0);

    var company = {
      name: salesData[i].name,
      province: salesData[i].province,
      sales: total
    }
    salesTotal.push(company);
  }
  return salesTotal;
}


function addSalesTaxToCompany(salesData, taxRates) {
  for (var i = 0; i < salesData.length; i++) {
    salesData[i].tax = salesData[i].sales * taxRates[salesData[i].province]
  }
  return salesData;
}


function sumSalesAndTaxForCompany(salesDataWithTax) {
  var result = {};
  for (var i = 0; i < salesDataWithTax.length; i++) {

    var name = salesDataWithTax[i].name;
    var totalSalesValue = salesDataWithTax[i].sales;
    var totalTaxesValue = salesDataWithTax[i].tax;

    if (!result[name]) {
      result[name] = {
        totalSales: totalSalesValue,
        totalTaxes: totalTaxesValue
      }
    } else {
      result[name].totalSales += salesDataWithTax[i].sales;
      result[name].totalTaxes += salesDataWithTax[i].tax;
    }
  }
  return result;
}


function salesTaxReport(companySalesData, taxRates) {
  var companiesWithSumSales = calculateSales(companySalesData);
  var companiesWithTax = addSalesTaxToCompany(companiesWithSumSales, taxRates);
  return sumSalesAndTaxForCompany(companiesWithTax);
}

console.log(salesTaxReport(COMPANIES_SALES_DATA, SALES_TAX_RATES));

