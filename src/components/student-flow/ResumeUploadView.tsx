import React, { useState, useRef } from 'react';
import {
  FileUp,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Layers,
} from 'lucide-react';
import { LearnerProfile } from '../../types';
import { demoStudentDataScientist } from '../../data/platformData';

interface ResumeUploadViewProps {
  onProceedToScan?: (resumeInfo: { fileName: string; fileSize: string; profile: LearnerProfile }) => void;
  onAnalyzeResume?: (file: { name: string; size?: string }, profile?: Partial<LearnerProfile>) => void;
  onExplorePlatform?: () => void;
}

export const sampleResumes = [
  {
    id: 'ai-student',
    name: 'Aarav Sharma — B.Tech CSE (AI/ML) 2025',
    college: 'Indian Institute of Technology / NIT',
    claimedSkills: ['Python', 'SQL', 'Machine Learning', 'Data Structures', 'Algorithms', 'Docker'],
    fileSize: '480 KB',
    fileName: 'Aarav_Sharma_Resume_2025.pdf',
    profile: {
      ...demoStudentDataScientist,
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.edu',
      branch: 'Computer Science & Engineering (AI/ML)',
      college: 'National Institute of Technology',
      graduation: '2025',
      targetRole: 'Data Scientist / ML Engineer',
      projects: 3,
      experience: 1,
      assessment: 0, // Not verified yet!
    },
  },
  {
    id: 'web-student',
    name: 'Priya Patel — B.Tech Information Technology 2025',
    college: 'Vellore Institute of Technology',
    claimedSkills: ['JavaScript', 'TypeScript', 'React', 'Python', 'SQL', 'Git'],
    fileSize: '512 KB',
    fileName: 'Priya_Patel_FullStack_2025.pdf',
    profile: {
      ...demoStudentDataScientist,
      name: 'Priya Patel',
      email: 'priya.patel@example.edu',
      branch: 'Information Technology',
      college: 'Vellore Institute of Technology',
      graduation: '2025',
      targetRole: 'Full Stack Engineer',
      projects: 4,
      experience: 1,
      assessment: 0,
    },
  },
  {
    id: 'cloud-student',
    name: 'Rohan Deshmukh — B.Tech Electronics & Computers 2026',
    college: 'BITS Pilani',
    claimedSkills: ['Python', 'Linux', 'Docker', 'SQL', 'Cloud Computing', 'Git'],
    fileSize: '420 KB',
    fileName: 'Rohan_Deshmukh_Cloud_2026.pdf',
    profile: {
      ...demoStudentDataScientist,
      name: 'Rohan Deshmukh',
      email: 'rohan.deshmukh@example.edu',
      branch: 'Electronics & Computer Engineering',
      college: 'BITS Pilani',
      graduation: '2026',
      targetRole: 'Cloud / DevOps Engineer',
      projects: 2,
      experience: 0,
      assessment: 0,
    },
  },
];

export const ResumeUploadView: React.FC<ResumeUploadViewProps> = ({
  onProceedToScan,
  onAnalyzeResume,
  onExplorePlatform,
}) => {
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: string;
    progress: number;
    profile: LearnerProfile;
  } | null>({
    name: sampleResumes[0].fileName,
    size: sampleResumes[0].fileSize,
    progress: 100,
    profile: sampleResumes[0].profile,
  });

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelected(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    const sizeKB = Math.round(file.size / 1024);
    const sizeStr = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;

    // Map to custom profile using the file name
    const customProfile: LearnerProfile = {
      ...sampleResumes[0].profile,
      name: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
      sourceFile: file.name,
      assessment: 0,
    };

    setSelectedFile({
      name: file.name,
      size: sizeStr,
      progress: 100,
      profile: customProfile,
    });
  };

  const handleSelectSample = (sample: typeof sampleResumes[0]) => {
    setSelectedFile({
      name: sample.fileName,
      size: sample.fileSize,
      progress: 100,
      profile: sample.profile,
    });
  };

  const handleAnalyzeClick = () => {
    if (selectedFile) {
      if (typeof onProceedToScan === 'function') {
        onProceedToScan({
          fileName: selectedFile.name,
          fileSize: selectedFile.size,
          profile: selectedFile.profile,
        });
      }
      if (typeof onAnalyzeResume === 'function') {
        onAnalyzeResume(
          { name: selectedFile.name, size: selectedFile.size },
          selectedFile.profile
        );
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3.5 py-1 text-xs font-semibold text-sky-800">
          <Sparkles className="size-3.5 text-sky-600" />
          <span>Stage 1: Verified Skill Profile Calibration</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 uppercase">
          WELCOME TO SKILLALIGN
        </h1>
        <p className="text-base sm:text-lg font-medium text-sky-900 max-w-xl mx-auto">
          Build your verified skill profile.
        </p>
        <p className="text-xs sm:text-sm text-stone-500 max-w-lg mx-auto">
          Upload your resume in PDF or DOCX format to trigger automated skill extraction, evidence tracing, and personalized coding diagnostics.
        </p>
      </div>

      {/* Upload Box (Strict compliance with Section 4) */}
      <div className="rounded-3xl border-2 border-dashed border-stone-300 bg-white p-8 text-center hover:border-slate-900 transition relative">
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.doc"
          className="hidden"
          onChange={handleFileInputChange}
        />

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`space-y-4 py-6 ${isDragging ? 'bg-sky-50/50 rounded-2xl' : ''}`}
        >
          <div className="size-16 rounded-2xl bg-sky-50 border border-sky-200 grid place-items-center text-sky-700 mx-auto">
            <FileUp className="size-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              Drag & Drop Your Resume
            </h3>
            <p className="text-xs text-stone-500">
              Supported formats: <strong className="text-slate-800">PDF, DOCX, DOC</strong> (Up to 15MB)
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <span className="text-xs text-stone-400 font-mono">OR</span>
          </div>

          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-xs font-bold text-white hover:bg-slate-800 transition shadow-sm cursor-pointer uppercase tracking-wider"
            >
              <FileText className="size-4 text-sky-400" />
              <span>UPLOAD RESUME</span>
            </button>
          </div>
        </div>

        {/* Uploaded File Feedback */}
        {selectedFile && (
          <div className="mt-6 pt-6 border-t border-stone-200 text-left">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-[#FAF8F5] p-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-white border border-stone-200 grid place-items-center text-rose-600 font-bold text-xs shadow-2xs">
                  PDF
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">{selectedFile.name}</p>
                  <p className="text-[11px] text-stone-500">File size: {selectedFile.size}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="size-4" />
                  <span>Upload progress: 100%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleAnalyzeClick}
                className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-xs font-bold text-white hover:bg-sky-700 shadow-sm transition cursor-pointer"
              >
                <span>Analyze Resume</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Benchmark Samples */}
      <div className="rounded-2xl border border-stone-200 bg-white p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900">
            Or Test Drive with Benchmark Engineering Profiles:
          </span>
          <span className="text-[10px] text-stone-500">Click any profile to load instant resume</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {sampleResumes.map((sample) => {
            const isSelected = selectedFile?.name === sample.fileName;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className={`text-left rounded-xl border p-3.5 transition cursor-pointer ${
                  isSelected
                    ? 'border-slate-900 bg-stone-50 ring-1 ring-slate-900 shadow-2xs'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{sample.name.split('—')[0]}</span>
                  <span className="rounded-md bg-stone-100 px-1.5 py-0.5 text-[9px] font-mono font-bold text-stone-600">
                    {sample.fileSize}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 mt-1">{sample.college}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {sample.claimedSkills.slice(0, 3).map((s) => (
                    <span key={s} className="rounded bg-stone-100 px-1.5 py-0.5 text-[9px] text-stone-700">
                      {s}
                    </span>
                  ))}
                  <span className="text-[9px] text-stone-400">+{sample.claimedSkills.length - 3}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
