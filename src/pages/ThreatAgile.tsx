//@ts-ignore
import React from 'react';
import { Box, Button, Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import QuestionsTable from "./questions/QuestionsTable.tsx";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Question from "../types/Question";
import AbuseCasesTable from "./abuse-cases/AbuseCasesTable.tsx";
import AbuseCase from "../types/AbuseCase.tsx";
import Tag from "../types/Tag.tsx";
import SecurityRequirementTable from './security-requirements/SecurityRequirementsTable.tsx';
import SecurityRequirement from '../types/SecurityRequirement.tsx';
import TagsTable from './tags/TagsTable.tsx';
import DataAssetsTable from './data-assets/DataAssetsTable.tsx';

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
  const [dataAssetsList, setDataAssetsList] = useState<Tag[]>([]);

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
            <TextField
              size="small"
              fullWidth
              focused
              label="Title of the model"
              {...register("title")}
              type="input"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              focused
              label="Date of the model"
              {...register("date")}
              type="input"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              focused
              label="Author Name"
              {...register("authorName")}
              type="input"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              size="small"
              fullWidth
              focused
              label="Author Homepage"
              {...register("authorHomePage")}
              type="input"
            />
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
            <TextField
              size="small"
              fullWidth
              focused
              label="Business criticality of the target"
              {...register("business_criticality")}
              type="input"
            />
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
            <TextField
              size="small"
              fullWidth
              focused
              label="Custom images for the report"
              {...register("business_overview_images")}
              type="input"
            />
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
            <TextField
              size="small"
              fullWidth
              focused
              label="Custom images for the report"
              {...register("technical_overview_images")}
              type="input"
            />
          </Grid>
        </Grid>

        {/* Questions Table Start*/}
        <Grid>
          <QuestionsTable
            questionsList={questions}
            setQuestionsList={setQuestions}
          />
        </Grid>
        <Grid>
          <AbuseCasesTable
            abuseCases={abuseCases}
            setAbuseCases={setAbuseCases}
          />
        </Grid>
        {/* Questions Table End*/}

        <Grid>
          <SecurityRequirementTable
            securityRequirementsList={securityRequirementsList}
            setSecurityRequirementsList={setSecurityRequirementsList}
          />
        </Grid>
        <Grid>
          <TagsTable
            tagsList={tagsList}
            setTagsList={setTagsList}
          />
        </Grid>

        <Grid item xs={12} md={6}  maxWidth="lg">
          <DataAssetsTable
            dataAssetsList={dataAssetsList}
            setDataAssetsList={setDataAssetsList}
          />
        </Grid>

        <Box sx={{ paddingTop: "20px", marginLeft: "0px" }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>

        <br />
        <b>Submitted form Data:</b>
        <Typography sx={{ wordBreak: "break-word" }}>
          {JSON.stringify(formData)}
        </Typography>
      </form>
    </div>
  );
}
