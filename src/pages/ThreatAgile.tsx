//@ts-ignore
import React from "react";
import { Box, Button, Grid, Tab, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import QuestionsTable from "./questions/QuestionsTable.tsx";
import { useState } from "react";
import Typography from "@mui/material/Typography";
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
import Tabs from "@mui/material/Tabs";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext } from "@mui/lab";

type FormValues = {
  firstName: string;
};

export default function ThreatAgile() {
  const [formData, setFormData] = useState({});
  const { register, handleSubmit } = useForm<any>();
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

  const onSubmit = (data: FormValues) => {
    setFormData({ ...data, questions, abuse_cases: abuseCases });
    console.log({ ...data, questions, abuse_cases: abuseCases });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} id="threatAgileForm">
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
            <TextField size="small" fullWidth focused label="Date of the model" {...register("date")} type="input" />
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
              label="Individual management summary for the report"
              {...register("management_summary_comment")}
              type="input"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField size="small" fullWidth focused label="Business criticality of the target" {...register("business_criticality")} type="input" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              focused
              label="Business criticality of the target"
              {...register("business_overview_description")}
              type="input"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField size="small" fullWidth focused label="Custom images for the report" {...register("business_overview_images")} type="input" />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              focused
              label="Individual technical overview for the report"
              {...register("technical_overview_description")}
              type="input"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField size="small" fullWidth focused label="Custom images for the report" {...register("technical_overview_images")} type="input" />
          </Grid>
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
                <TechnicalAssetsTable technicalAssetsList={technicalAssetsList} setTechnicalAssetsList={setTechnicalAssetsList} />
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

        <br />
        <b>Submitted form Data:</b>
        <Typography sx={{ wordBreak: "break-word" }}>{JSON.stringify(formData)}</Typography>
      </form>
    </div>
  );
}
