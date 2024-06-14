import React from "react";
import CreateForm from "./_components/CreateForm";
import FormList from "./_components/FormList";

const Dashboard = () => {
  return (
    <>
      <div className="p-10 text-white">
        <h2 className="flex items-center justify-between text-2xl font-bold">
          <p className="text-primary">Dashboard</p>
          <CreateForm />
        </h2>
        {/* all user forms */}
        <FormList/>

      </div>
    </>
  );
};

export default Dashboard;
