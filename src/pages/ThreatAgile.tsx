//@ts-ignore
import React, { useRef } from "react";
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Tab, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import QuestionsTable from "./questions/QuestionsTable.tsx";
import { useState } from "react";
import Question from "../types/Question";
import AbuseCasesTable from "./abuse-cases/AbuseCasesTable.tsx";
import AbuseCase from "../types/AbuseCase.tsx";
import Tag from "../types/Tag.tsx";
import SecurityRequirementTable from "./security-requirements/SecurityRequirementsTable.tsx";
import SecurityRequirement from "../types/SecurityRequirement.tsx";
import TagsTable from "./tags/TagsTable.tsx";
import DataAssetsTable from "./data-assets/DataAssetsTable.tsx";
import RiskTrackingTable from "./risk-tracking/RiskTrackingTable.tsx";
import RiskTracking from "../types/RiskTracking.tsx";
import DataAssets from "../types/DataAssets.tsx";
import TechnicalAssets from "../types/TechnicalAssets.tsx";
import CommunicationLinks from "../types/CommunicationLinks.tsx";
import CommunicationLinksTable from "./communication-links/CommunicationLinksTable.tsx";
import TechnicalAssetsTable from "./technical-assets/TechnicalAssetsTable.tsx";
import SharedRuntimesTable from "./shared-runtimes/SharedRuntimesTable.tsx";
import TrustedBoundariesTable from "./trusted-boundaries/TrustedBoundariesTable.tsx";
import IndividualRiskCategoriesTable from "./inndividual-risk-categories/IndividualRiskCategories.tsx";
import IndividualRiskCategory from "../types/IndividualRiskCategory.tsx";
import SharedRuntime from "../types/SharedRuntime.tsx";
import TrustedBoundary from "../types/TrustedBoundary.tsx";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext } from "@mui/lab";
import DateField from "../components/DateField.tsx";
import jsyaml from "js-yaml";
import dayjs from "dayjs";

type FormValues = {
  date: Date;
};

export default function ThreatAgile() {
  // const [formData, setFormData] = useState({});
  const { register, handleSubmit, control } = useForm<any>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [abuseCases, setAbuseCases] = useState<AbuseCase[]>([]);
  const [securityRequirementsList, setSecurityRequirementsList] = useState<SecurityRequirement[]>([]);
  const [tagsList, setTagsList] = useState<Tag[]>([]);
  const [dataAssetsList, setDataAssetsList] = useState<DataAssets[]>([]);
  const [riskTrackingList, setRiskTrackingList] = useState<RiskTracking[]>([]);
  const [communicationLinksList, setCommunicationLinksList] = useState<CommunicationLinks[]>([]);
  const [technicalAssetsList, setTechnicalAssetsList] = useState<TechnicalAssets[]>([]);
  const [trustedBoundariesList, setTrustedBoundariesList] = useState<TrustedBoundary[]>([]);
  const [sharedRuntimesList, setSharedRuntimesList] = useState<SharedRuntime[]>([]);
  const [individualRiskCategoriesList, setIndividualRiskCategoriesList] = useState<IndividualRiskCategory[]>([]);

  const [tabSelected, setTabSelected] = React.useState("1");

  //@ts-ignore
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabSelected(newValue);
  };

  const handleFormSubmit: SubmitHandler<FormValues> = (data, event) => {
    if (event?.target.id === "threatAgileForm") {
      const formId = (event?.target as HTMLButtonElement).getAttribute("name");
      console.log("Form ID:", formId);
      console.log("handleFormSubmit got clicked");
      const submittedData = {
        ...data,
        date: data.date ? data.date.toISOString().split("T")[0] : null,
        questions,
        abuse_cases: abuseCases,
        security_requirements: securityRequirementsList,
        tags_available: tagsList,
        data_assets: dataAssetsList,
        technical_assets: technicalAssetsList,
        trust_boundaries: trustedBoundariesList,
        shared_runtimes: sharedRuntimesList,
        individual_risk_categories: individualRiskCategoriesList,
        risk_tracking: riskTrackingList,
      };
      //setFormData(submittedData);
      
      const yamlData = jsyaml.dump(submittedData);
      // Create a Blob object from the file content.
      const element = document.createElement("a");
      const file = new Blob([yamlData], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = `threat-model-${dayjs(new Date()).format("YYYYMMDD_HHmm")}.yaml`;
      document.body.appendChild(element);
      element.click();
      element.remove();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)} id="threatAgileForm">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              focused
              label="Version of Threat toolkit"
              type="input"
              defaultValue="1.0.0"
              {...register("threagile_version")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField size="small" fullWidth focused label="Title of the model" {...register("title")} type="input" />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth focused>
              <InputLabel>Date of the model</InputLabel>
              <DateField name="date" label="Date of the Model" control={control} />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField size="small" fullWidth focused label="Author Name" {...register("authorName")} type="input" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField size="small" fullWidth focused label="Author Homepage" {...register("authorHomePage")} type="input" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              focused
              label="Management summary for the report"
              {...register("management_summary_comment")}
              type="input"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth focused size="small">
              <InputLabel id="business-criticality">Business Criticality</InputLabel>
              <Select
                labelId="Business criticality"
                id="Business criticality"
                {...register("business_criticality")}
                label="Business Criticality"
                defaultValue=""
              >
                <MenuItem value={"archive"}>Achive</MenuItem>
                <MenuItem value={"operational"}>Operational</MenuItem>
                <MenuItem value={"important"}>Important</MenuItem>
                <MenuItem value={"critical"}>Critical</MenuItem>
                <MenuItem value={"mission-critical"}>Mission-critical</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField size="small" fullWidth focused label="Business Overview" {...register("business_overview_description")} type="input" />
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <TextField size="small" fullWidth focused label="Custom images for the report" {...register("business_overview_images")} type="input" />
          </Grid> */}

          <Grid item xs={12} md={12}>
            <TextField
              size="small"
              fullWidth
              focused
              label="Technical overview"
              {...register("technical_overview_description")}
              type="input"
              multiline
              minRows={3}
              maxRows={4}
            />
          </Grid>
          {/* <Grid item xs={12} md={6}>
            <TextField size="small" fullWidth focused label="Custom images for the report" {...register("technical_overview_images")} type="input" />
          </Grid> */}
        </Grid>

        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={tabSelected}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleTabChange}
                aria-label="lab API tabs example"
                variant="standard"
                sx={{
                  "& .MuiTabs-flexContainer": {
                    flexWrap: "wrap",
                  },
                  "& .MuiTabPanel-root": {
                    padding: 0,
                  },
                }}
              >
                <Tab label="Questions" value="1" wrapped />
                <Tab label="Abuse Cases" value="2" wrapped />
                <Tab label="Security Requirement" value="3" wrapped />
                <Tab label="Tags" value="4" />
                <Tab label="Data Assets" value="5" wrapped />
                <Tab label="Communication Link" value="6" wrapped />
                <Tab label="Technical Assets" value="7" wrapped />
                <Tab label="Trust Boundaries" value="8" wrapped />
                <Tab label="Shared Runtimes" value="9" wrapped />
                <Tab label="Ind Risk Categories" value="10" wrapped />
                <Tab label="Risk Tracking" value="11" wrapped />
              </TabList>
            </Box>
            <TabPanel value="1">
              {/* Questions Table Start*/}
              <Grid>
                <QuestionsTable questionsList={questions} setQuestionsList={setQuestions} />
              </Grid>

              {/* Questions Table End*/}
            </TabPanel>
            <TabPanel value="2">
              <Grid>
                <AbuseCasesTable abuseCases={abuseCases} setAbuseCases={setAbuseCases} />
              </Grid>
            </TabPanel>
            <TabPanel value="3">
              <Grid>
                <SecurityRequirementTable
                  securityRequirementsList={securityRequirementsList}
                  setSecurityRequirementsList={setSecurityRequirementsList}
                />
              </Grid>
            </TabPanel>
            <TabPanel value="4">
              <Grid>
                <TagsTable tagsList={tagsList} setTagsList={setTagsList} />
              </Grid>
            </TabPanel>
            <TabPanel value="5">
              <Grid item xs={12} md={6} maxWidth="lg">
                <DataAssetsTable dataAssetsList={dataAssetsList} setDataAssetsList={setDataAssetsList} />
              </Grid>
            </TabPanel>
            <TabPanel value="6">
              <Grid item xs={12} md={6} maxWidth="lg">
                <CommunicationLinksTable communicationLinksList={communicationLinksList} setCommunicationLinksList={setCommunicationLinksList} />
              </Grid>
            </TabPanel>
            <TabPanel value="7">
              <Grid item xs={12} md={6} maxWidth="lg">
                <TechnicalAssetsTable
                  technicalAssetsList={technicalAssetsList}
                  setTechnicalAssetsList={setTechnicalAssetsList}
                  dataAssetsList={dataAssetsList}
                />
              </Grid>
            </TabPanel>
            <TabPanel value="8">
              <Grid item xs={12} md={6} maxWidth="lg">
                <TrustedBoundariesTable trustedBoundariesList={trustedBoundariesList} setTrustedBoundariesList={setTrustedBoundariesList} />
              </Grid>
            </TabPanel>
            <TabPanel value="9">
              <Grid item xs={12} md={6} maxWidth="lg">
                <SharedRuntimesTable sharedRuntimesList={sharedRuntimesList} setSharedRuntimesList={setSharedRuntimesList} />
              </Grid>
            </TabPanel>
            <TabPanel value="10">
              <Grid item xs={12} md={6} maxWidth="lg">
                <IndividualRiskCategoriesTable
                  individualRiskCategoriesList={individualRiskCategoriesList}
                  setIndividualRiskCategoriesList={setIndividualRiskCategoriesList}
                />
              </Grid>
            </TabPanel>

            <TabPanel value="11">
              <Grid item xs={12} md={6} maxWidth="lg">
                <RiskTrackingTable riskTrackingList={riskTrackingList} setRiskTrackingList={setRiskTrackingList} />
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>

        <Box sx={{ paddingTop: "20px", marginLeft: "0px" }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
}
