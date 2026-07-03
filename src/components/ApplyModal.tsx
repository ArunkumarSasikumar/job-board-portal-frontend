'use client';

import { FocusTrap } from 'focus-trap-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useMutation } from '@apollo/client/react';
import { APPLY_JOB } from '../graphql/mutations';

type ApplyModalProps = {
  jobId: string;
  isOpen: boolean;
  onClose: () => void;
};

const allowedTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const applySchema = z.object({
  name: z.string().min(3, 'Name should contain atleast 3 Characters'),
  email: z.email(),
  coverLetter: z
    .any()
    .refine(
      (files) => allowedTypes.includes(files?.[0]?.type),
      'Only PDF/DOC files are allowed'
    ),
});

type jobApplyData = z.infer<typeof applySchema>;

export default function ApplyModal({
  jobId,
  isOpen,
  onClose,
}: ApplyModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<jobApplyData>({ resolver: zodResolver(applySchema) });

  const [applyToJob, { loading }] = useMutation(APPLY_JOB);
  const token = process.env.NEXT_PUBLIC_JWT_TOKEN;
  const onSubmit = async (data: jobApplyData) => {
    if (!jobId) {
      console.error('Job ID is missing');
      return;
    }

    const coverLetterFile = data?.coverLetter?.[0];
    try {
      await applyToJob({
        variables: {
          input: {
            jobId,
            name: data.name,
            email: data.email,
            coverLetter: coverLetterFile?.name ?? '',
          },
        },

        context: {
          headers: {
            authorization: token ? `Bearer ${token}` : '',
          },
        },

        optimisticResponse: {
          applyToJob: {
            __typename: 'Application',
            id: `temp-${jobId}`,
            jobId,
            name: data.name,
            email: data.email,
            coverLetter: coverLetterFile?.name ?? '',
            message: 'Application submitted successfully',
          },
        },

        update(cache) {
          const cacheId = cache.identify({
            __typename: 'Job',
            id: jobId,
          });

          if (!cacheId) return;

          cache.modify({
            id: cacheId,
            fields: {
              isApplied() {
                return true;
              },
            },
          });
        },
      });

      reset();
      onClose();
    } catch (err) {
      console.error('Apply failed:', err);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <FocusTrap
        focusTrapOptions={{
          escapeDeactivates: true,
          clickOutsideDeactivates: false,
          returnFocusOnDeactivate: true,
          fallbackFocus: '#modal',
          initialFocus: '#name',

          tabbableOptions: {
            displayCheck: 'none',
          },
        }}
      >
        <div
          className="fixed flex items-center justify-center inset-0 bg-[rgba(0,0,0,0.5)]"
          id="modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="min-w-[300px] bg-[var(--card-bg)] max-w-[600px] p-6 rounded-lg sm:w-[70%]">
            <h2
              id="modal-title"
              className="text-2xl font-bold mt-0 mb-3 mx-0 text-[var(--text-color)]"
            >
              Job Application Form
            </h2>
            <form
              className="flex flex-col gap-[18px]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-semibold text-[var(--text-color)]"
                >
                  Name:
                </label>
                <input
                  className="w-full text-sm text-[var(--text-color)] border border-gray-300 px-3 py-2.5 rounded-lg border-solid focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.2)]"
                  {...register('name')}
                  id="name"
                  type="text"
                  placeholder="Enter Name"
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-errormessage={errors.name ? 'err-msg' : undefined}
                />
                {errors.name && (
                  <p
                    role="alert"
                    className="text-[13px] text-red-600 font-medium mt-0.5 mb-0 mx-0"
                    id="err-msg"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-[var(--text-color)]"
                >
                  Email:
                </label>
                <input
                  className="w-full text-sm text-[var(--text-color)] border border-gray-300 px-3 py-2.5 rounded-lg border-solid focus:border-blue-600 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.2)] transition-[border-color,box-shadow] duration-200 ease-in-out placeholder:text-gray-400"
                  {...register('email')}
                  type="email"
                  placeholder="Enter Email"
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-errormessage={errors.email ? 'err-msg-email' : undefined}
                />
                {errors.email && (
                  <p
                    role="alert"
                    className="text-[13px] text-red-600 font-medium mt-0.5 mb-0 mx-0"
                    id="err-msg-email"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[var(--text-color)]">
                  Cover Letter
                </label>
                <input
                  className="cursor-pointer bg-[var(--page-bg)] text-[var(--text-color)] p-2 file:bg-[var(--card-bg)] file:text-[var(--text-color)] file:font-semibold file:cursor-pointer file:mr-3 file:px-3 file:py-2 file:rounded-md file:border-[none] file:hover:bg-gray-300"
                  {...register('coverLetter')}
                  type="file"
                  accept=".pdf,.doc"
                  placeholder="Upload Cover Letter"
                  aria-invalid={errors.coverLetter ? 'true' : 'false'}
                  aria-errormessage={
                    errors.coverLetter ? 'err-msg-cvr' : undefined
                  }
                />
                {errors.coverLetter && (
                  <p
                    role="alert"
                    className="text-[13px] text-red-600 font-medium mt-0.5 mb-0 mx-0"
                    id="err-msg-cvr"
                  >
                    {String(errors.coverLetter.message)}
                  </p>
                )}
              </div>
              <div className="flex flex-row mt-[15px] justify-between">
                <button type="button" onClick={onClose} className="btn">
                  Cancel
                </button>
                <button type="submit" className="btn" disabled={loading}>
                  {loading ? 'Applying...' : 'Apply'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}
