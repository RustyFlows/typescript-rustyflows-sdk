// Generated from artifacts/openapi.json; do not edit.
export const transportSchemas: Record<string, unknown> = {
  "ApiError": {
    "type": "object",
    "description": "The sole ordinary REST failure envelope; never contains a success payload.",
    "required": [
      "code",
      "message"
    ],
    "properties": {
      "code": {
        "$ref": "#/components/schemas/ApiErrorCode"
      },
      "details": {
        "nullable": true
      },
      "message": {
        "type": "string"
      }
    }
  },
  "ApiErrorCode": {
    "type": "string",
    "description": "Stable failure semantics; messages are supplementary and never authoritative.",
    "enum": [
      "invalid_input",
      "unauthenticated",
      "unauthorized",
      "not_found",
      "conflict",
      "over_limit",
      "dependency_unavailable",
      "timeout",
      "internal_failure",
      "unsupported_version",
      "not_acceptable",
      "unsupported_media_type",
      "method_not_allowed",
      "provider_failure"
    ]
  },
  "StreamEvent": {
    "oneOf": [
      {
        "type": "object",
        "description": "Chat product conversation selected for this workflow execution.",
        "required": [
          "conversation_id",
          "type"
        ],
        "properties": {
          "conversation_id": {
            "type": "string",
            "format": "uuid"
          },
          "type": {
            "type": "string",
            "enum": [
              "conversation"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Completed chat content, followed by the shared execution summary and Done.",
        "required": [
          "content",
          "type"
        ],
        "properties": {
          "content": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "message_complete"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Workflow-level metadata (first event emitted).",
        "required": [
          "provider",
          "type"
        ],
        "properties": {
          "endpoint": {
            "type": "string",
            "nullable": true
          },
          "model": {
            "type": "string",
            "nullable": true
          },
          "provider": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "meta"
            ]
          },
          "workflow": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "type": "object",
        "description": "A workflow step is about to execute.",
        "required": [
          "step_index",
          "step_kind",
          "type"
        ],
        "properties": {
          "agent_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "frame_path": {
            "type": "string",
            "nullable": true
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "step_index": {
            "type": "integer",
            "minimum": 0
          },
          "step_kind": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "step_start"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Incremental token from a provider SSE stream.",
        "required": [
          "content",
          "type"
        ],
        "properties": {
          "content": {
            "type": "string"
          },
          "metadata": {
            "nullable": true
          },
          "step": {
            "type": "string",
            "nullable": true
          },
          "type": {
            "type": "string",
            "enum": [
              "delta"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "An agent decided to call a tool.",
        "required": [
          "tool_name",
          "type"
        ],
        "properties": {
          "arguments": {
            "nullable": true
          },
          "call_id": {
            "type": "string",
            "nullable": true
          },
          "tool_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "tool_name": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "tool_call"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "A tool returned a result.",
        "required": [
          "tool_name",
          "result",
          "duration_ms",
          "type"
        ],
        "properties": {
          "data_op_profile": {
            "allOf": [
              {
                "$ref": "#/components/schemas/DataOpProfile"
              }
            ],
            "nullable": true
          },
          "duration_ms": {
            "type": "integer",
            "format": "int64",
            "minimum": 0
          },
          "error_kind": {
            "allOf": [
              {
                "$ref": "#/components/schemas/ErrorKind"
              }
            ],
            "nullable": true
          },
          "result": {
            "type": "string"
          },
          "tool_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "tool_name": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "tool_result"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "A workflow step finished executing.",
        "required": [
          "step_index",
          "duration_ms",
          "type"
        ],
        "properties": {
          "duration_ms": {
            "type": "integer",
            "format": "int64",
            "minimum": 0
          },
          "frame_path": {
            "type": "string",
            "nullable": true
          },
          "step_index": {
            "type": "integer",
            "minimum": 0
          },
          "tokens": {
            "type": "integer",
            "format": "int32",
            "nullable": true,
            "minimum": 0
          },
          "type": {
            "type": "string",
            "enum": [
              "step_end"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Synthetic full-message event preserving the step's JSON content.\nExisting text stays a JSON string; structured content (including image\nmetadata) stays a JSON value rather than being encoded into a string.",
        "required": [
          "content",
          "type"
        ],
        "properties": {
          "content": {
            "$ref": "#/components/schemas/JsonValue"
          },
          "step": {
            "type": "string",
            "nullable": true
          },
          "type": {
            "type": "string",
            "enum": [
              "message"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Loop iteration progress.",
        "required": [
          "iteration",
          "type"
        ],
        "properties": {
          "content": {
            "type": "string",
            "nullable": true
          },
          "iteration": {
            "type": "integer",
            "format": "int32",
            "minimum": 0
          },
          "total": {
            "type": "integer",
            "format": "int32",
            "nullable": true,
            "minimum": 0
          },
          "type": {
            "type": "string",
            "enum": [
              "loop_progress"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "step_index",
          "status",
          "type"
        ],
        "properties": {
          "name": {
            "type": "string",
            "nullable": true
          },
          "status": {
            "$ref": "#/components/schemas/ReportRenderingStatus"
          },
          "step_index": {
            "type": "integer",
            "minimum": 0
          },
          "type": {
            "type": "string",
            "enum": [
              "report_rendering"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "step_index",
          "filename",
          "report_id",
          "type"
        ],
        "properties": {
          "filename": {
            "type": "string"
          },
          "name": {
            "type": "string",
            "nullable": true
          },
          "report_id": {
            "type": "string",
            "format": "uuid"
          },
          "size_bytes": {
            "type": "integer",
            "format": "int64",
            "nullable": true,
            "minimum": 0
          },
          "step_index": {
            "type": "integer",
            "minimum": 0
          },
          "type": {
            "type": "string",
            "enum": [
              "report_complete"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Final concatenated workflow output.",
        "required": [
          "content",
          "type"
        ],
        "properties": {
          "completion_tokens": {
            "type": "integer",
            "format": "int32",
            "description": "Completion/output tokens generated (from provider usage).",
            "nullable": true,
            "minimum": 0
          },
          "content": {
            "type": "string"
          },
          "prompt_tokens": {
            "type": "integer",
            "format": "int32",
            "description": "Prompt/input tokens used for this completion (from provider usage).",
            "nullable": true,
            "minimum": 0
          },
          "type": {
            "type": "string",
            "enum": [
              "final"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Workflow execution summary (trace data).",
        "required": [
          "trace",
          "type"
        ],
        "properties": {
          "trace": {},
          "type": {
            "type": "string",
            "enum": [
              "summary"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "The run was cancelled through the run API.\n\nTerminal: the stream ends after this event and `done`. Clients must not\nreport a cancelled run as a success or as an internal error.",
        "required": [
          "reason",
          "type"
        ],
        "properties": {
          "evidence": {
            "allOf": [
              {
                "$ref": "#/components/schemas/WorkflowErrorEvidence"
              }
            ],
            "nullable": true
          },
          "reason": {
            "type": "string",
            "description": "Stable reason code: `user_cancelled` when the caller cancelled the\nrun through the run API. Clients switch on it; cancellation is\nnever inferred from stream closure."
          },
          "run_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "type": {
            "type": "string",
            "enum": [
              "cancelled"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Error during execution.",
        "required": [
          "message",
          "error_kind",
          "type"
        ],
        "properties": {
          "error_kind": {
            "$ref": "#/components/schemas/ErrorKind"
          },
          "evidence": {
            "allOf": [
              {
                "$ref": "#/components/schemas/WorkflowErrorEvidence"
              }
            ],
            "nullable": true
          },
          "message": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "error"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "A checkpoint was successfully persisted after a step.",
        "required": [
          "step_index",
          "run_id",
          "type"
        ],
        "properties": {
          "run_id": {
            "type": "string",
            "format": "uuid"
          },
          "step_index": {
            "type": "integer",
            "minimum": 0
          },
          "type": {
            "type": "string",
            "enum": [
              "checkpoint_saved"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Workflow execution is resuming from a previous run.",
        "required": [
          "run_id",
          "from_step",
          "total_steps",
          "type"
        ],
        "properties": {
          "from_step": {
            "type": "integer",
            "minimum": 0
          },
          "run_id": {
            "type": "string",
            "format": "uuid"
          },
          "total_steps": {
            "type": "integer",
            "minimum": 0
          },
          "type": {
            "type": "string",
            "enum": [
              "resume_start"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "A step failed and its fallback workflow is about to execute.",
        "required": [
          "step_index",
          "original_error",
          "type"
        ],
        "properties": {
          "original_error": {
            "type": "string"
          },
          "step_index": {
            "type": "integer",
            "minimum": 0
          },
          "type": {
            "type": "string",
            "enum": [
              "fallback_triggered"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "A step is being retried after a transient failure.",
        "required": [
          "step_index",
          "attempt",
          "max_attempts",
          "delay_ms",
          "type"
        ],
        "properties": {
          "attempt": {
            "type": "integer",
            "format": "int32",
            "minimum": 0
          },
          "delay_ms": {
            "type": "integer",
            "format": "int64",
            "minimum": 0
          },
          "max_attempts": {
            "type": "integer",
            "format": "int32",
            "minimum": 0
          },
          "step_index": {
            "type": "integer",
            "minimum": 0
          },
          "type": {
            "type": "string",
            "enum": [
              "retry"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "The run is waiting for human input on one interaction.",
        "required": [
          "interaction_id",
          "run_id",
          "response_type",
          "question",
          "type"
        ],
        "properties": {
          "choices": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "nullable": true
          },
          "context": {
            "description": "Safe display context for the prompt; never credentials or hidden prompts.",
            "nullable": true
          },
          "expires_at": {
            "type": "string",
            "nullable": true
          },
          "guardian_guidance": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Display guidance from matching Guardian `guide` rules."
          },
          "interaction_id": {
            "type": "string",
            "format": "uuid",
            "description": "The persisted gate record that resolves this interaction."
          },
          "question": {
            "type": "string"
          },
          "response_type": {
            "type": "string",
            "description": "Interaction response type: `text`, `confirmation`, or `single_select`."
          },
          "run_id": {
            "type": "string",
            "format": "uuid"
          },
          "timeout_action": {
            "type": "string",
            "nullable": true
          },
          "type": {
            "type": "string",
            "enum": [
              "interaction_required"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "A tool call is being dispatched to a sub-agent.",
        "required": [
          "agent_name",
          "agent_id",
          "input",
          "type"
        ],
        "properties": {
          "agent_id": {
            "type": "string",
            "format": "uuid"
          },
          "agent_name": {
            "type": "string"
          },
          "call_id": {
            "type": "string",
            "nullable": true
          },
          "input": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "agent_delegation"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "A sub-agent returned its result.",
        "required": [
          "agent_name",
          "agent_id",
          "result",
          "duration_ms",
          "type"
        ],
        "properties": {
          "agent_id": {
            "type": "string",
            "format": "uuid"
          },
          "agent_name": {
            "type": "string"
          },
          "duration_ms": {
            "type": "integer",
            "format": "int64",
            "minimum": 0
          },
          "error_kind": {
            "allOf": [
              {
                "$ref": "#/components/schemas/ErrorKind"
              }
            ],
            "nullable": true
          },
          "result": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "agent_response"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "An MCP (Model Context Protocol) tool is being called.",
        "required": [
          "tool_name",
          "server_name",
          "raw_tool_name",
          "type"
        ],
        "properties": {
          "arguments": {
            "nullable": true
          },
          "call_id": {
            "type": "string",
            "nullable": true
          },
          "raw_tool_name": {
            "type": "string",
            "description": "The raw (non-namespaced) tool name on the MCP server."
          },
          "server_name": {
            "type": "string",
            "description": "The MCP server that hosts this tool."
          },
          "tool_name": {
            "type": "string",
            "description": "Namespaced tool name (e.g., \"mcp__github__list_issues\")."
          },
          "type": {
            "type": "string",
            "enum": [
              "mcp_tool_call"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "An MCP tool returned a result.",
        "required": [
          "tool_name",
          "server_name",
          "result",
          "is_error",
          "duration_ms",
          "type"
        ],
        "properties": {
          "duration_ms": {
            "type": "integer",
            "format": "int64",
            "minimum": 0
          },
          "error_kind": {
            "allOf": [
              {
                "$ref": "#/components/schemas/ErrorKind"
              }
            ],
            "nullable": true
          },
          "is_error": {
            "type": "boolean"
          },
          "result": {
            "type": "string"
          },
          "server_name": {
            "type": "string"
          },
          "tool_name": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "mcp_tool_result"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Knowledge retrieval results from a KnowledgeStep.",
        "required": [
          "step_index",
          "source_ids",
          "query",
          "results_count",
          "type"
        ],
        "properties": {
          "query": {
            "type": "string"
          },
          "results_count": {
            "type": "integer",
            "minimum": 0
          },
          "source_ids": {
            "type": "array",
            "items": {
              "type": "string",
              "format": "uuid"
            }
          },
          "step_index": {
            "type": "integer",
            "minimum": 0
          },
          "top_similarity": {
            "type": "number",
            "format": "float",
            "nullable": true
          },
          "type": {
            "type": "string",
            "enum": [
              "knowledge_results"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "FanOut branch completion progress.",
        "required": [
          "branch_index",
          "total_branches",
          "type"
        ],
        "properties": {
          "branch_index": {
            "type": "integer",
            "format": "int32",
            "minimum": 0
          },
          "content": {
            "type": "string",
            "nullable": true
          },
          "group": {
            "type": "string",
            "nullable": true
          },
          "total_branches": {
            "type": "integer",
            "format": "int32",
            "minimum": 0
          },
          "type": {
            "type": "string",
            "enum": [
              "fan_out_progress"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "A workflow run has been created and is about to start executing.\nEmitted after `prepare_workflow_run()` so the frontend can capture the `run_id`.",
        "required": [
          "run_id",
          "type"
        ],
        "properties": {
          "run_id": {
            "type": "string",
            "format": "uuid"
          },
          "type": {
            "type": "string",
            "enum": [
              "run_started"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Reconnect reports durable state references, never replays execution.",
        "required": [
          "run_id",
          "status",
          "gap",
          "run_url",
          "interactions_url",
          "type"
        ],
        "properties": {
          "gap": {
            "type": "boolean"
          },
          "interactions_url": {
            "type": "string"
          },
          "run_id": {
            "type": "string",
            "format": "uuid"
          },
          "run_url": {
            "type": "string"
          },
          "status": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "resync"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Stream termination signal (always the last event).",
        "required": [
          "type"
        ],
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "done"
            ]
          }
        }
      }
    ],
    "description": "All SSE event variants emitted during workflow streaming.\n\nSerialised with `#[serde(tag = \"type\", rename_all = \"snake_case\")]` so\neach variant produces `{\"type\":\"variant_name\", ...}`.",
    "discriminator": {
      "propertyName": "type"
    }
  },
  "DataOpProfile": {
    "type": "object",
    "description": "Content-free observations; unknown counts are absent, never fabricated zero.",
    "required": [
      "version",
      "mode",
      "status",
      "partial",
      "operation_count",
      "expression_nodes",
      "admission_wait_us",
      "compute_us",
      "total_us",
      "string_bytes",
      "regex_candidate_bytes",
      "similarity_cells",
      "operations"
    ],
    "properties": {
      "admission_wait_us": {
        "type": "integer",
        "format": "int64",
        "minimum": 0
      },
      "compute_us": {
        "type": "integer",
        "format": "int64",
        "minimum": 0
      },
      "error_code": {
        "type": "string",
        "nullable": true
      },
      "expression_nodes": {
        "type": "integer",
        "minimum": 0
      },
      "failing_operation_index": {
        "type": "integer",
        "nullable": true,
        "minimum": 0
      },
      "input_bytes": {
        "type": "integer",
        "nullable": true,
        "minimum": 0
      },
      "input_fields": {
        "type": "integer",
        "nullable": true,
        "minimum": 0
      },
      "input_rows": {
        "type": "integer",
        "nullable": true,
        "minimum": 0
      },
      "mode": {
        "$ref": "#/components/schemas/DataOpProfileMode"
      },
      "operation_count": {
        "type": "integer",
        "minimum": 0
      },
      "operations": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/DataOpOperationProfile"
        }
      },
      "output_bytes": {
        "type": "integer",
        "nullable": true,
        "minimum": 0
      },
      "output_fields": {
        "type": "integer",
        "nullable": true,
        "minimum": 0
      },
      "output_rows": {
        "type": "integer",
        "nullable": true,
        "minimum": 0
      },
      "partial": {
        "type": "boolean"
      },
      "regex_candidate_bytes": {
        "type": "integer",
        "minimum": 0
      },
      "similarity_cells": {
        "type": "integer",
        "minimum": 0
      },
      "status": {
        "$ref": "#/components/schemas/DataOpProfileStatus"
      },
      "string_bytes": {
        "type": "integer",
        "minimum": 0
      },
      "total_us": {
        "type": "integer",
        "format": "int64",
        "minimum": 0
      },
      "version": {
        "type": "integer",
        "format": "int32",
        "minimum": 0
      }
    }
  },
  "DataOpProfileMode": {
    "type": "string",
    "enum": [
      "execution",
      "preview"
    ]
  },
  "DataOpOperationProfile": {
    "type": "object",
    "required": [
      "index",
      "kind",
      "input_rows",
      "duration_us"
    ],
    "properties": {
      "duration_us": {
        "type": "integer",
        "format": "int64",
        "minimum": 0
      },
      "index": {
        "type": "integer",
        "minimum": 0
      },
      "input_rows": {
        "type": "integer",
        "minimum": 0
      },
      "kind": {
        "type": "string"
      },
      "output_rows": {
        "type": "integer",
        "nullable": true,
        "minimum": 0
      }
    }
  },
  "DataOpProfileStatus": {
    "type": "string",
    "enum": [
      "success",
      "validation_failure",
      "limit",
      "timeout",
      "cancelled",
      "internal_failure"
    ]
  },
  "ErrorKind": {
    "type": "string",
    "description": "Stable execution-failure categories shared by API, checkpoints and streams.",
    "enum": [
      "Agent",
      "Guardian",
      "ToolExecution",
      "InvalidConfig",
      "NoMatch",
      "Resolution",
      "Gate",
      "Persistence",
      "Other",
      "Limit",
      "Deadline",
      "Provider",
      "MissingContinuation"
    ]
  },
  "JsonValue": {
    "oneOf": [
      {
        "type": "string",
        "enum": [
          null
        ],
        "nullable": true
      },
      {
        "type": "boolean"
      },
      {
        "type": "number",
        "format": "double"
      },
      {
        "type": "string"
      },
      {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/JsonValue"
        }
      },
      {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/JsonValue"
        }
      }
    ],
    "description": "Recursive JSON values; clients must retain exact wire integers."
  },
  "ReportRenderingStatus": {
    "type": "string",
    "enum": [
      "populating",
      "rendering",
      "uploading"
    ]
  },
  "WorkflowErrorEvidence": {
    "type": "object",
    "required": [
      "failure"
    ],
    "properties": {
      "branches": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/BranchTrace"
        }
      },
      "children": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/ScopedFailureEvidence"
        }
      },
      "failure": {
        "$ref": "#/components/schemas/FailureEvidence"
      },
      "omitted_branches": {
        "type": "integer",
        "format": "int32",
        "minimum": 0
      },
      "omitted_children": {
        "type": "integer",
        "format": "int32",
        "minimum": 0
      },
      "primary_branch": {
        "type": "integer",
        "format": "int32",
        "nullable": true,
        "minimum": 0
      }
    },
    "additionalProperties": false
  },
  "BranchTrace": {
    "type": "object",
    "description": "Evidence for one lane of a composite step (parallel branch or loop iteration).\n\nArguments, results, and raw error text are deliberately excluded; only a\nbounded error category is recorded.",
    "required": [
      "index",
      "status"
    ],
    "properties": {
      "duration_ms": {
        "type": "integer",
        "format": "int64",
        "nullable": true,
        "minimum": 0
      },
      "error_kind": {
        "allOf": [
          {
            "$ref": "#/components/schemas/ErrorKind"
          }
        ],
        "nullable": true
      },
      "failure": {
        "allOf": [
          {
            "$ref": "#/components/schemas/FailureEvidence"
          }
        ],
        "nullable": true
      },
      "index": {
        "type": "integer",
        "format": "int32",
        "description": "Lane index in the owning composite step.",
        "minimum": 0
      },
      "input_bytes": {
        "type": "integer",
        "nullable": true,
        "minimum": 0
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "source_index": {
        "type": "integer",
        "format": "int32",
        "description": "Original input-array position for a dynamic FanOut lane.",
        "nullable": true,
        "minimum": 0
      },
      "status": {
        "type": "string",
        "description": "Stable lowercase status: `completed`, `failed`, `cancelled`, or `skipped`."
      }
    }
  },
  "FailureEvidence": {
    "type": "object",
    "required": [
      "error_kind",
      "cancelled"
    ],
    "properties": {
      "cancelled": {
        "type": "boolean"
      },
      "completion_node_unavailable": {
        "type": "boolean"
      },
      "data_op_profile": {
        "allOf": [
          {
            "$ref": "#/components/schemas/DataOpProfile"
          }
        ],
        "nullable": true
      },
      "error_kind": {
        "$ref": "#/components/schemas/ErrorKind"
      },
      "omitted_profile_operations": {
        "type": "integer",
        "format": "int32",
        "minimum": 0
      },
      "runtime_limit": {
        "allOf": [
          {
            "$ref": "#/components/schemas/RuntimeLimitEvidence"
          }
        ],
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "RuntimeLimitEvidence": {
    "type": "object",
    "required": [
      "limit",
      "observed",
      "maximum"
    ],
    "properties": {
      "limit": {
        "$ref": "#/components/schemas/RuntimeLimitKind"
      },
      "maximum": {
        "type": "integer",
        "format": "int64",
        "minimum": 0
      },
      "observed": {
        "type": "integer",
        "format": "int64",
        "minimum": 0
      }
    },
    "additionalProperties": false
  },
  "RuntimeLimitKind": {
    "type": "string",
    "enum": [
      "active_time_ms",
      "tokens",
      "cost_microusd",
      "provider_usage_unknown",
      "model_price_unknown",
      "concurrency",
      "step_input_bytes",
      "step_output_bytes",
      "step_named_output_bytes",
      "template_output_bytes",
      "workflow_frame_bytes",
      "workflow_steps",
      "loop_iterations",
      "while_iterations",
      "parallel_branches",
      "fanout_sources",
      "fanout_branches",
      "fanout_branch_definitions",
      "fanout_output_bytes",
      "nesting_depth",
      "model_attachment_count",
      "model_attachment_bytes",
      "model_input_bytes",
      "image_source_url_bytes",
      "image_source_bytes",
      "image_dimension",
      "image_pixels",
      "image_working_bytes",
      "image_decoded_bytes",
      "image_encoded_bytes",
      "image_template_value_bytes",
      "image_template_bytes",
      "image_template_expressions",
      "image_template_filters",
      "image_template_capture_bytes",
      "image_source_attachment_count",
      "image_source_attachment_bytes"
    ]
  },
  "ScopedFailureEvidence": {
    "type": "object",
    "required": [
      "branch_path",
      "failure"
    ],
    "properties": {
      "branch_path": {
        "type": "array",
        "items": {
          "type": "integer",
          "format": "int32",
          "minimum": 0
        }
      },
      "failure": {
        "$ref": "#/components/schemas/FailureEvidence"
      }
    },
    "additionalProperties": false
  },
  "ActiveDeploymentResponse": {
    "type": "object",
    "description": "Response body for the active deployment endpoint.",
    "required": [
      "environment_id",
      "environment_name"
    ],
    "properties": {
      "deployment": {
        "allOf": [
          {
            "$ref": "#/components/schemas/DeploymentRowResponse"
          }
        ],
        "nullable": true
      },
      "environment_id": {
        "type": "string",
        "format": "uuid"
      },
      "environment_name": {
        "type": "string"
      }
    }
  },
  "DeploymentRowResponse": {
    "type": "object",
    "description": "A deployment row in list responses.",
    "required": [
      "id",
      "package_name",
      "package_version",
      "status",
      "environment_id",
      "created_at"
    ],
    "properties": {
      "created_at": {
        "type": "string"
      },
      "environment_id": {
        "type": "string",
        "format": "uuid"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "package_name": {
        "type": "string"
      },
      "package_version": {
        "type": "string"
      },
      "status": {
        "type": "string"
      }
    }
  },
  "AgentDetailResponse": {
    "type": "object",
    "required": [
      "agent"
    ],
    "properties": {
      "agent": {
        "$ref": "#/components/schemas/AgentDetailRow"
      }
    }
  },
  "AgentDetailRow": {
    "allOf": [
      {
        "$ref": "#/components/schemas/AgentFullRow"
      },
      {
        "type": "object",
        "required": [
          "tools"
        ],
        "properties": {
          "tools": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ToolSummary"
            }
          }
        }
      }
    ]
  },
  "AgentFullRow": {
    "type": "object",
    "description": "Full agent row including model_id and timestamps (for single-agent fetch).",
    "required": [
      "id",
      "name",
      "model_name",
      "model_provider",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "completion_node_model_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "created_at": {
        "type": "string"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "fallback_model_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "fallback_model_name": {
        "type": "string",
        "nullable": true
      },
      "fallback_model_provider": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "model_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "model_name": {
        "type": "string"
      },
      "model_provider": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "system_prompt_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "updated_at": {
        "type": "string"
      }
    }
  },
  "ToolSummary": {
    "type": "object",
    "description": "Minimal tool summary for editor dropdowns.",
    "required": [
      "id",
      "name"
    ],
    "properties": {
      "description": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "is_builtin": {
        "type": "boolean",
        "nullable": true
      },
      "kind": {
        "type": "string",
        "description": "Tool kind extracted from `spec.kind` (e.g. \"http\", \"email\", \"database\").",
        "nullable": true
      },
      "name": {
        "type": "string"
      }
    }
  },
  "AgentExecutionRequest": {
    "type": "object",
    "description": "Public input shared by Agent execution routes; the route selects JSON or SSE.",
    "required": [
      "agent_id",
      "input"
    ],
    "properties": {
      "agent_id": {
        "type": "string",
        "format": "uuid"
      },
      "conversation_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "deployment_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "environment_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "input": {
        "type": "string"
      },
      "memory_window_messages": {
        "type": "integer",
        "format": "int32",
        "nullable": true,
        "minimum": 0
      },
      "memory_window_tokens": {
        "type": "integer",
        "format": "int32",
        "nullable": true,
        "minimum": 0
      },
      "provider_params": {
        "allOf": [
          {
            "$ref": "#/components/schemas/ProviderParams"
          }
        ],
        "nullable": true
      },
      "stream": {
        "type": "boolean",
        "description": "The endpoint selects JSON or SSE; this field does not change the route."
      },
      "use_memory": {
        "type": "boolean",
        "nullable": true
      }
    }
  },
  "ProviderParams": {
    "type": "object",
    "description": "Optional per-call provider configuration.\nNot all fields are used by every provider.",
    "properties": {
      "candidate_count": {
        "type": "integer",
        "format": "int32",
        "nullable": true,
        "minimum": 0
      },
      "max_tokens": {
        "type": "integer",
        "format": "int32",
        "nullable": true,
        "minimum": 0
      },
      "temperature": {
        "type": "number",
        "format": "float",
        "nullable": true
      },
      "top_k": {
        "type": "integer",
        "format": "int32",
        "nullable": true,
        "minimum": 0
      },
      "top_p": {
        "type": "number",
        "format": "float",
        "nullable": true
      }
    }
  },
  "AgentInsert": {
    "type": "object",
    "description": "Insert payload for creating an agent.",
    "required": [
      "name"
    ],
    "properties": {
      "completion_node_model_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "fallback_model_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "model_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "name": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid",
        "description": "Tenant organization ID — set server-side from auth context.",
        "nullable": true
      },
      "system_prompt_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    }
  },
  "AgentListRow": {
    "type": "object",
    "description": "Summary row for agent list (lighter payload, no model_id).",
    "required": [
      "id",
      "name",
      "model_name",
      "model_provider",
      "created_at",
      "updated_at",
      "expose_as_mcp"
    ],
    "properties": {
      "completion_node_model_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "created_at": {
        "type": "string"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "expose_as_mcp": {
        "type": "boolean"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "model_name": {
        "type": "string"
      },
      "model_provider": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "updated_at": {
        "type": "string"
      }
    }
  },
  "AgentResponse": {
    "type": "object",
    "description": "Single agent wrapper.",
    "required": [
      "agent"
    ],
    "properties": {
      "agent": {
        "$ref": "#/components/schemas/AgentFullRow"
      }
    }
  },
  "AgentStep": {
    "type": "object",
    "description": "Step: Invoke an Agent by id (from Supabase agents table) or via inline config.",
    "properties": {
      "agent": {
        "allOf": [
          {
            "$ref": "#/components/schemas/InlineAgentConfig"
          }
        ],
        "nullable": true
      },
      "agent_id": {
        "type": "string",
        "format": "uuid",
        "description": "UUID of the agent to invoke (mutually exclusive with `agent`).",
        "nullable": true
      },
      "exclude_mcp_servers": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "MCP servers to exclude from tool resolution for this step.\nBy default all MCP servers are available; list server names here to opt-out."
      },
      "fallback": {
        "allOf": [
          {
            "$ref": "#/components/schemas/Workflow"
          }
        ],
        "nullable": true
      },
      "guardian_rule_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        },
        "description": "Optional Guardian rule assignments. A gate tool raised by this step is\nevaluated against them in addition to organization-default rules."
      },
      "human_input": {
        "allOf": [
          {
            "$ref": "#/components/schemas/HumanInputConfig"
          }
        ],
        "nullable": true
      },
      "image_source": {
        "type": "string",
        "description": "Optional reference to a named output containing attachments for image URLs.\nLooks up ctx.named_outputs[source], extracts .attachments[] array,\nand includes image URLs in the prompt.",
        "nullable": true
      },
      "image_urls": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Optional list of image URLs to include with the prompt (for vision models).\nCan use template variables like \"{{attachment_0}}\" or \"{{optimized_image}}\".",
        "nullable": true
      },
      "include_attachments": {
        "type": "boolean",
        "description": "If true, automatically include all attachments from the workflow request."
      },
      "inline_tools": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/InlineToolSpec"
        },
        "description": "Inline tool definitions — built-in tools configured directly on the step.\nThese are synthesized into ToolRows at execution time (no DB lookup)."
      },
      "input_template": {
        "type": "string",
        "description": "Optional input template. If provided, may reference variables or prior step outputs.\nFor example: \"Summarize: {{input}}\" or \"Add 1000 to {{last}}\".",
        "nullable": true
      },
      "knowledge_source_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        },
        "description": "Optional knowledge source IDs for auto-RAG context injection.\nWhen set, the step automatically retrieves relevant chunks and prepends them to the input.",
        "nullable": true
      },
      "knowledge_top_k": {
        "type": "integer",
        "format": "int32",
        "description": "Maximum chunks to retrieve for auto-RAG (default: 3).",
        "nullable": true,
        "minimum": 0
      },
      "memory": {
        "type": "boolean",
        "description": "Explicit opt-in to use conversation memory for this step (default off).",
        "nullable": true
      },
      "memory_record_original_input": {
        "type": "boolean",
        "description": "If true, record the original user input (ctx.initial_input) instead of step_input when writing to memory.\nThis is useful for the first step (e.g., Intent Classifier) that should record the clean user message."
      },
      "memory_window_messages": {
        "type": "integer",
        "format": "int32",
        "description": "Optional memory window by count of messages to include when memory is enabled.",
        "nullable": true,
        "minimum": 0
      },
      "memory_window_tokens": {
        "type": "integer",
        "format": "int32",
        "description": "Optional memory window by token budget to include when memory is enabled.",
        "nullable": true,
        "minimum": 0
      },
      "name": {
        "type": "string",
        "description": "Optional name for the result (lets later steps reference this output by name).",
        "nullable": true
      },
      "resume_policy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StepResumePolicy"
          }
        ],
        "nullable": true
      },
      "retry": {
        "allOf": [
          {
            "$ref": "#/components/schemas/RetryPolicy"
          }
        ],
        "nullable": true
      },
      "tool_agent_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        },
        "description": "Optional \"agent tools\" represented as agent ids (agent-as-tool).\nWhen provided, the target agent may use these tool agents to fulfill the request."
      }
    }
  },
  "InlineAgentConfig": {
    "type": "object",
    "description": "Inline agent configuration — define model/provider/system_prompt directly in the workflow\nJSON instead of referencing a DB-stored agent by id.",
    "properties": {
      "completion_node_model_id": {
        "type": "string",
        "format": "uuid",
        "description": "Tenant-owned saved completion-node model, exclusive with model/provider.",
        "nullable": true
      },
      "model": {
        "type": "string",
        "description": "Model identifier (e.g. \"gpt-4o\", \"claude-3-sonnet-20240229\")."
      },
      "provider": {
        "type": "string",
        "description": "Provider name (e.g. \"openai\", \"anthropic\", \"gemini\", \"fireworks\")."
      },
      "system_prompt": {
        "type": "string",
        "description": "Optional system prompt text.",
        "nullable": true
      }
    }
  },
  "Workflow": {
    "type": "object",
    "description": "-------- Dynamic Workflow Types for Agentic Pipelines --------\nA workflow is a sequence of steps that can include prompt calls, mapping, routing,\nand parallel branches.",
    "properties": {
      "condition": {
        "allOf": [
          {
            "$ref": "#/components/schemas/Condition"
          }
        ],
        "nullable": true
      },
      "grounding": {
        "allOf": [
          {
            "$ref": "#/components/schemas/GroundingConfig"
          }
        ],
        "nullable": true
      },
      "name": {
        "type": "string",
        "description": "Optional human-friendly name for the workflow (useful when stored in DB).",
        "nullable": true
      },
      "runtime_limits": {
        "allOf": [
          {
            "$ref": "#/components/schemas/WorkflowExecutionLimits"
          }
        ],
        "nullable": true
      },
      "steps": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/WorkflowStep"
        },
        "description": "Steps executed in order, unless a router or parallel step alters control flow.\nMay be empty when `workflow_id` is set (steps are loaded from DB during resolution)."
      },
      "workflow_id": {
        "type": "string",
        "format": "uuid",
        "description": "Optional reference to a stored workflow by id.\nWhen set, the workflow's steps are loaded from the DB during resolution.\nCan be used in parallel branches, loop bodies, and router branches.",
        "nullable": true
      }
    }
  },
  "Condition": {
    "type": "object",
    "description": "Conditional execution configuration for any step.",
    "required": [
      "template"
    ],
    "properties": {
      "template": {
        "type": "string",
        "description": "Template expression that should evaluate to \"true\" to execute the step."
      }
    }
  },
  "GroundingConfig": {
    "type": "object",
    "description": "Workflow-level grounding settings.",
    "properties": {
      "fallback": {
        "$ref": "#/components/schemas/GroundingFallback"
      },
      "requirement": {
        "$ref": "#/components/schemas/GroundingRequirement"
      }
    }
  },
  "GroundingFallback": {
    "type": "string",
    "description": "What happens when a `required` reply is not grounded.",
    "enum": [
      "refuse",
      "escalate"
    ]
  },
  "GroundingRequirement": {
    "type": "string",
    "description": "How strongly a workflow reply must be supported by retrieved sources.",
    "enum": [
      "off",
      "preferred",
      "required"
    ]
  },
  "WorkflowExecutionLimits": {
    "type": "object",
    "properties": {
      "max_active_seconds": {
        "type": "integer",
        "format": "int64",
        "nullable": true,
        "minimum": 0
      },
      "max_concurrency": {
        "type": "integer",
        "format": "int32",
        "nullable": true,
        "minimum": 0
      },
      "max_cost_microusd": {
        "type": "integer",
        "format": "int64",
        "nullable": true,
        "minimum": 0
      },
      "max_fanout_branches": {
        "type": "integer",
        "format": "int32",
        "nullable": true,
        "minimum": 0
      },
      "max_loop_iterations": {
        "type": "integer",
        "format": "int32",
        "nullable": true,
        "minimum": 0
      },
      "max_parallel_branches": {
        "type": "integer",
        "format": "int32",
        "nullable": true,
        "minimum": 0
      },
      "max_step_bytes": {
        "type": "integer",
        "format": "int64",
        "nullable": true,
        "minimum": 0
      },
      "max_tokens": {
        "type": "integer",
        "format": "int64",
        "nullable": true,
        "minimum": 0
      },
      "max_workflow_steps": {
        "type": "integer",
        "format": "int32",
        "nullable": true,
        "minimum": 0
      }
    },
    "additionalProperties": false
  },
  "WorkflowStep": {
    "oneOf": [
      {
        "type": "object",
        "required": [
          "kind",
          "data"
        ],
        "properties": {
          "data": {
            "$ref": "#/components/schemas/AgentStep"
          },
          "kind": {
            "type": "string",
            "enum": [
              "Agent"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "kind",
          "data"
        ],
        "properties": {
          "data": {
            "$ref": "#/components/schemas/MapStep"
          },
          "kind": {
            "type": "string",
            "enum": [
              "Map"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "kind",
          "data"
        ],
        "properties": {
          "data": {
            "$ref": "#/components/schemas/RouterStep"
          },
          "kind": {
            "type": "string",
            "enum": [
              "Router"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "kind",
          "data"
        ],
        "properties": {
          "data": {
            "$ref": "#/components/schemas/ParallelStep"
          },
          "kind": {
            "type": "string",
            "enum": [
              "Parallel"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "kind",
          "data"
        ],
        "properties": {
          "data": {
            "$ref": "#/components/schemas/ToolStep"
          },
          "kind": {
            "type": "string",
            "enum": [
              "Tool"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "kind",
          "data"
        ],
        "properties": {
          "data": {
            "$ref": "#/components/schemas/LoopStep"
          },
          "kind": {
            "type": "string",
            "enum": [
              "Loop"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "kind",
          "data"
        ],
        "properties": {
          "data": {
            "$ref": "#/components/schemas/ImageProcessStep"
          },
          "kind": {
            "type": "string",
            "enum": [
              "ImageProcess"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "kind",
          "data"
        ],
        "properties": {
          "data": {
            "$ref": "#/components/schemas/GenerateStep"
          },
          "kind": {
            "type": "string",
            "enum": [
              "Generate"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "kind",
          "data"
        ],
        "properties": {
          "data": {
            "$ref": "#/components/schemas/GateStep"
          },
          "kind": {
            "type": "string",
            "enum": [
              "Gate"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "kind",
          "data"
        ],
        "properties": {
          "data": {
            "$ref": "#/components/schemas/SupervisorStep"
          },
          "kind": {
            "type": "string",
            "enum": [
              "Supervisor"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "kind",
          "data"
        ],
        "properties": {
          "data": {
            "$ref": "#/components/schemas/FanOutStep"
          },
          "kind": {
            "type": "string",
            "enum": [
              "FanOut"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "kind",
          "data"
        ],
        "properties": {
          "data": {
            "$ref": "#/components/schemas/KnowledgeStep"
          },
          "kind": {
            "type": "string",
            "enum": [
              "Knowledge"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "kind",
          "data"
        ],
        "properties": {
          "data": {
            "$ref": "#/components/schemas/DataOpStep"
          },
          "kind": {
            "type": "string",
            "enum": [
              "DataOp"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "kind",
          "data"
        ],
        "properties": {
          "data": {
            "$ref": "#/components/schemas/RulesetStep"
          },
          "kind": {
            "type": "string",
            "enum": [
              "Ruleset"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "kind",
          "data"
        ],
        "properties": {
          "data": {
            "$ref": "#/components/schemas/ReportGenerateData"
          },
          "kind": {
            "type": "string",
            "enum": [
              "ReportGenerate"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "kind",
          "data"
        ],
        "properties": {
          "data": {
            "$ref": "#/components/schemas/ClassificationStep"
          },
          "kind": {
            "type": "string",
            "enum": [
              "Classification"
            ]
          }
        }
      }
    ],
    "description": "A single step within a workflow.",
    "discriminator": {
      "propertyName": "kind"
    }
  },
  "MapStep": {
    "type": "object",
    "description": "Step: Apply a mapping operation.",
    "required": [
      "op"
    ],
    "properties": {
      "name": {
        "type": "string",
        "description": "Optional name for the result (lets later steps reference this output by name).",
        "nullable": true
      },
      "op": {
        "$ref": "#/components/schemas/MapOp"
      },
      "resume_policy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StepResumePolicy"
          }
        ],
        "nullable": true
      }
    }
  },
  "MapOp": {
    "oneOf": [
      {
        "type": "object",
        "required": [
          "op"
        ],
        "properties": {
          "op": {
            "type": "string",
            "enum": [
              "Identity"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "op",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "description": "Apply a string template to form the next value.\nVariables like {{input}} and named step outputs may be substituted at runtime.",
            "required": [
              "template"
            ],
            "properties": {
              "template": {
                "type": "string"
              }
            }
          },
          "op": {
            "type": "string",
            "enum": [
              "Template"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "op",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "description": "Extract a portion of JSON from a source string using a simple path.\n\n- `from`: Optional name of a prior named output; if omitted, uses the current value.\n- `path`: Dot path with optional array indexes like `data`, `data[0]`, `data[0].field`.",
            "required": [
              "path"
            ],
            "properties": {
              "from": {
                "type": "string",
                "nullable": true
              },
              "path": {
                "type": "string"
              }
            }
          },
          "op": {
            "type": "string",
            "enum": [
              "JsonExtract"
            ]
          }
        }
      }
    ],
    "description": "Mapping operations for simple deterministic transforms (no LLM call).",
    "discriminator": {
      "propertyName": "op"
    }
  },
  "StepResumePolicy": {
    "type": "string",
    "description": "Resume policy for an interrupted top-level workflow step.",
    "enum": [
      "auto_rerun",
      "manual_rerun_required"
    ]
  },
  "RouterStep": {
    "type": "object",
    "description": "Step: Route to one of several branches.\nA router may choose a branch using literal matching, regex, or by delegating\nto a classifier agent.",
    "required": [
      "strategy"
    ],
    "properties": {
      "default": {
        "allOf": [
          {
            "$ref": "#/components/schemas/Workflow"
          }
        ],
        "nullable": true
      },
      "name": {
        "type": "string",
        "description": "Stable step identifier used by lifecycle events and step-scoped policies.",
        "nullable": true
      },
      "resume_policy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StepResumePolicy"
          }
        ],
        "nullable": true
      },
      "strategy": {
        "$ref": "#/components/schemas/RouterStrategy"
      }
    }
  },
  "RouterStrategy": {
    "oneOf": [
      {
        "type": "object",
        "required": [
          "strategy",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "description": "Match the latest value (or a named variable) by literal string equality.",
            "required": [
              "cases"
            ],
            "properties": {
              "cases": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/RouterCase"
                }
              }
            }
          },
          "strategy": {
            "type": "string",
            "enum": [
              "Literal"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "strategy",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "description": "Match using regular expressions (first match wins).",
            "required": [
              "cases"
            ],
            "properties": {
              "cases": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/RouterRegexCase"
                }
              }
            }
          },
          "strategy": {
            "type": "string",
            "enum": [
              "Regex"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "strategy",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "description": "Ask a classifier agent to return a label; route based on that label.",
            "required": [
              "classifier_agent_id",
              "cases"
            ],
            "properties": {
              "cases": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/RouterCase"
                },
                "description": "Cases mapping classifier labels to branches."
              },
              "classifier_agent_id": {
                "type": "string",
                "format": "uuid",
                "description": "Classifier agent id to query."
              }
            }
          },
          "strategy": {
            "type": "string",
            "enum": [
              "Agent"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "strategy",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "description": "Evaluate data conditions against tabular/JSON output from the previous step.",
            "required": [
              "cases"
            ],
            "properties": {
              "cases": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/RouterExpressionCase"
                }
              }
            }
          },
          "strategy": {
            "type": "string",
            "enum": [
              "Expression"
            ]
          }
        }
      }
    ],
    "description": "Strategies for selecting a branch in a router step.",
    "discriminator": {
      "propertyName": "strategy"
    }
  },
  "RouterCase": {
    "type": "object",
    "description": "A router case using literal matching.",
    "required": [
      "when",
      "branch"
    ],
    "properties": {
      "branch": {
        "$ref": "#/components/schemas/Workflow"
      },
      "when": {
        "type": "string",
        "description": "The literal value to match (e.g., \"cow\", \"sheep\", \"dog\")."
      }
    }
  },
  "RouterRegexCase": {
    "type": "object",
    "description": "A router case using regex matching.",
    "required": [
      "pattern",
      "branch"
    ],
    "properties": {
      "branch": {
        "$ref": "#/components/schemas/Workflow"
      },
      "pattern": {
        "type": "string",
        "description": "A regular expression pattern to test."
      }
    }
  },
  "RouterExpressionCase": {
    "type": "object",
    "description": "A router case using data expression evaluation.",
    "required": [
      "label",
      "condition",
      "branch"
    ],
    "properties": {
      "branch": {
        "$ref": "#/components/schemas/Workflow"
      },
      "condition": {
        "$ref": "#/components/schemas/ExpressionCondition"
      },
      "label": {
        "type": "string",
        "description": "Human-readable label for the branch."
      }
    }
  },
  "ExpressionCondition": {
    "oneOf": [
      {
        "type": "object",
        "description": "Apply a filter expression; matches if any rows remain.",
        "required": [
          "expression",
          "type"
        ],
        "properties": {
          "expression": {
            "$ref": "#/components/schemas/FilterExpr"
          },
          "type": {
            "type": "string",
            "enum": [
              "Filter"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Compare the JSON row count against a threshold.",
        "required": [
          "op",
          "value",
          "type"
        ],
        "properties": {
          "op": {
            "$ref": "#/components/schemas/ComparisonOp"
          },
          "type": {
            "type": "string",
            "enum": [
              "RowCount"
            ]
          },
          "value": {
            "type": "integer",
            "minimum": 0
          }
        }
      },
      {
        "type": "object",
        "description": "Compute an aggregate on a column and compare against a threshold.",
        "required": [
          "column",
          "function",
          "op",
          "value",
          "type"
        ],
        "properties": {
          "column": {
            "type": "string"
          },
          "function": {
            "$ref": "#/components/schemas/AggFunction"
          },
          "op": {
            "$ref": "#/components/schemas/ComparisonOp"
          },
          "type": {
            "type": "string",
            "enum": [
              "Aggregate"
            ]
          },
          "value": {
            "type": "number",
            "format": "double"
          }
        }
      }
    ],
    "description": "A condition evaluated against tabular data for expression routing.",
    "discriminator": {
      "propertyName": "type"
    }
  },
  "FilterExpr": {
    "oneOf": [
      {
        "type": "object",
        "description": "Version 1 typed expression. Legacy predicate tags remain readable.",
        "required": [
          "version",
          "expression",
          "type"
        ],
        "properties": {
          "expression": {
            "$ref": "#/components/schemas/DataExpr"
          },
          "type": {
            "type": "string",
            "enum": [
              "Expression"
            ]
          },
          "version": {
            "type": "integer",
            "format": "int32",
            "minimum": 0
          }
        }
      },
      {
        "type": "object",
        "description": "Single comparison condition.",
        "required": [
          "column",
          "op",
          "type"
        ],
        "properties": {
          "column": {
            "type": "string"
          },
          "op": {
            "$ref": "#/components/schemas/FilterOp"
          },
          "type": {
            "type": "string",
            "enum": [
              "Condition"
            ]
          },
          "value": {}
        }
      },
      {
        "type": "object",
        "description": "Logical AND of sub-expressions.",
        "required": [
          "conditions",
          "type"
        ],
        "properties": {
          "conditions": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/FilterExpr"
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "And"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Logical OR of sub-expressions.",
        "required": [
          "conditions",
          "type"
        ],
        "properties": {
          "conditions": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/FilterExpr"
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "Or"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Logical NOT of a sub-expression.",
        "required": [
          "condition",
          "type"
        ],
        "properties": {
          "condition": {
            "$ref": "#/components/schemas/FilterExpr"
          },
          "type": {
            "type": "string",
            "enum": [
              "Not"
            ]
          }
        }
      }
    ],
    "description": "Boolean filter expression DSL.",
    "discriminator": {
      "propertyName": "type"
    }
  },
  "DataExpr": {
    "oneOf": [
      {
        "type": "object",
        "required": [
          "value",
          "type"
        ],
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "literal"
            ]
          },
          "value": {}
        }
      },
      {
        "type": "object",
        "required": [
          "segments",
          "type"
        ],
        "properties": {
          "segments": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/DataPathSegment"
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "path"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "name",
          "type"
        ],
        "properties": {
          "name": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "parameter"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "left",
          "op",
          "right",
          "type"
        ],
        "properties": {
          "left": {
            "$ref": "#/components/schemas/DataExpr"
          },
          "op": {
            "$ref": "#/components/schemas/MathOp"
          },
          "right": {
            "$ref": "#/components/schemas/DataExpr"
          },
          "type": {
            "type": "string",
            "enum": [
              "math"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "left",
          "op",
          "right",
          "type"
        ],
        "properties": {
          "left": {
            "$ref": "#/components/schemas/DataExpr"
          },
          "op": {
            "$ref": "#/components/schemas/FilterOp"
          },
          "right": {
            "$ref": "#/components/schemas/DataExpr"
          },
          "type": {
            "type": "string",
            "enum": [
              "compare"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "op",
          "values",
          "type"
        ],
        "properties": {
          "op": {
            "$ref": "#/components/schemas/DataLogicOp"
          },
          "type": {
            "type": "string",
            "enum": [
              "logic"
            ]
          },
          "values": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/DataExpr"
            }
          }
        }
      },
      {
        "type": "object",
        "required": [
          "op",
          "value",
          "type"
        ],
        "properties": {
          "op": {
            "$ref": "#/components/schemas/DataUnaryOp"
          },
          "type": {
            "type": "string",
            "enum": [
              "unary"
            ]
          },
          "value": {
            "$ref": "#/components/schemas/DataExpr"
          }
        }
      },
      {
        "type": "object",
        "required": [
          "values",
          "type"
        ],
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "coalesce"
            ]
          },
          "values": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/DataExpr"
            }
          }
        }
      },
      {
        "type": "object",
        "required": [
          "condition",
          "then_value",
          "else_value",
          "type"
        ],
        "properties": {
          "condition": {
            "$ref": "#/components/schemas/DataExpr"
          },
          "else_value": {
            "$ref": "#/components/schemas/DataExpr"
          },
          "then_value": {
            "$ref": "#/components/schemas/DataExpr"
          },
          "type": {
            "type": "string",
            "enum": [
              "conditional"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "parts",
          "type"
        ],
        "properties": {
          "parts": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/DataExpr"
            }
          },
          "separator": {
            "type": "string",
            "nullable": true
          },
          "type": {
            "type": "string",
            "enum": [
              "concat"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "value",
          "pattern",
          "type"
        ],
        "properties": {
          "pattern": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "regex_match"
            ]
          },
          "value": {
            "$ref": "#/components/schemas/DataExpr"
          }
        }
      },
      {
        "type": "object",
        "required": [
          "left",
          "right",
          "type"
        ],
        "properties": {
          "left": {
            "$ref": "#/components/schemas/DataExpr"
          },
          "right": {
            "$ref": "#/components/schemas/DataExpr"
          },
          "type": {
            "type": "string",
            "enum": [
              "normalized_levenshtein"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "value",
          "to_type",
          "type"
        ],
        "properties": {
          "to_type": {
            "$ref": "#/components/schemas/CastType"
          },
          "type": {
            "type": "string",
            "enum": [
              "cast"
            ]
          },
          "value": {
            "$ref": "#/components/schemas/DataExpr"
          }
        }
      }
    ],
    "description": "Canonical typed row expression. Paths never split literal keys on dots.",
    "discriminator": {
      "propertyName": "type"
    }
  },
  "DataPathSegment": {
    "oneOf": [
      {
        "type": "string"
      },
      {
        "type": "integer",
        "minimum": 0
      }
    ]
  },
  "MathOp": {
    "type": "string",
    "description": "Arithmetic operators for Math column expressions.",
    "enum": [
      "add",
      "sub",
      "mul",
      "div",
      "mod"
    ]
  },
  "FilterOp": {
    "type": "string",
    "description": "Filter comparison operators.",
    "enum": [
      "eq",
      "neq",
      "gt",
      "gte",
      "lt",
      "lte",
      "contains",
      "starts_with",
      "ends_with",
      "in",
      "not_in",
      "is_null",
      "is_not_null"
    ]
  },
  "DataLogicOp": {
    "type": "string",
    "enum": [
      "and",
      "or"
    ]
  },
  "DataUnaryOp": {
    "type": "string",
    "enum": [
      "not",
      "is_null",
      "length",
      "trim",
      "lower",
      "upper"
    ]
  },
  "CastType": {
    "type": "string",
    "description": "Cast target types.",
    "enum": [
      "string",
      "int64",
      "float64",
      "boolean",
      "date",
      "datetime"
    ]
  },
  "ComparisonOp": {
    "type": "string",
    "description": "Comparison operators for expression-based routing conditions.",
    "enum": [
      "eq",
      "neq",
      "gt",
      "gte",
      "lt",
      "lte"
    ]
  },
  "AggFunction": {
    "type": "string",
    "description": "Supported aggregate functions.",
    "enum": [
      "sum",
      "count",
      "mean",
      "min",
      "max",
      "first",
      "last",
      "median",
      "std_dev"
    ]
  },
  "ParallelStep": {
    "type": "object",
    "description": "Step: Run multiple branches in parallel and optionally reduce their results.",
    "required": [
      "branches"
    ],
    "properties": {
      "branches": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/Workflow"
        },
        "description": "Branches to run concurrently."
      },
      "reducer": {
        "allOf": [
          {
            "$ref": "#/components/schemas/ParallelReducer"
          }
        ],
        "nullable": true
      },
      "resume_policy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StepResumePolicy"
          }
        ],
        "nullable": true
      },
      "streaming_strategy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StreamingStrategy"
          }
        ],
        "nullable": true
      }
    }
  },
  "ParallelReducer": {
    "oneOf": [
      {
        "type": "object",
        "required": [
          "kind"
        ],
        "properties": {
          "kind": {
            "type": "string",
            "enum": [
              "Concat"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Build a final string from a template. Branch outputs may be referenced by index or name.",
        "required": [
          "template",
          "kind"
        ],
        "properties": {
          "kind": {
            "type": "string",
            "enum": [
              "Template"
            ]
          },
          "template": {
            "type": "string"
          }
        }
      },
      {
        "type": "object",
        "required": [
          "kind"
        ],
        "properties": {
          "kind": {
            "type": "string",
            "enum": [
              "JsonArray"
            ]
          }
        }
      }
    ],
    "description": "Reduction strategy for parallel branches.",
    "discriminator": {
      "propertyName": "kind"
    }
  },
  "StreamingStrategy": {
    "type": "string",
    "description": "Streaming strategy for parallel step execution.\nDetermines how branch results are streamed to the client.",
    "enum": [
      "as_completed",
      "ordered",
      "template_segments",
      "buffered_complete",
      "none"
    ]
  },
  "ToolStep": {
    "type": "object",
    "description": "Step: Execute a registered tool (spec-driven, e.g. HTTP).",
    "required": [
      "tool_id"
    ],
    "properties": {
      "condition": {
        "allOf": [
          {
            "$ref": "#/components/schemas/Condition"
          }
        ],
        "nullable": true
      },
      "fallback": {
        "allOf": [
          {
            "$ref": "#/components/schemas/Workflow"
          }
        ],
        "nullable": true
      },
      "name": {
        "type": "string",
        "description": "Optional output name (referenced later via {{steps.NAME}})",
        "nullable": true
      },
      "params_template": {
        "type": "string",
        "description": "Optional params template that renders to JSON passed to the tool executor.",
        "nullable": true
      },
      "resume_policy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StepResumePolicy"
          }
        ],
        "nullable": true
      },
      "retry": {
        "allOf": [
          {
            "$ref": "#/components/schemas/RetryPolicy"
          }
        ],
        "nullable": true
      },
      "tool_id": {
        "type": "string",
        "format": "uuid",
        "description": "UUID of the tool row in agent_factory.tools"
      }
    }
  },
  "RetryPolicy": {
    "type": "object",
    "description": "Retry policy for error recovery.",
    "required": [
      "max_attempts",
      "delay_ms"
    ],
    "properties": {
      "backoff_multiplier": {
        "type": "number",
        "format": "double",
        "description": "Exponential backoff multiplier (e.g., 2.0 means double delay each time).",
        "nullable": true
      },
      "delay_ms": {
        "type": "integer",
        "format": "int64",
        "description": "Delay between retries in milliseconds.",
        "minimum": 0
      },
      "max_attempts": {
        "type": "integer",
        "format": "int32",
        "description": "Maximum number of retry attempts.",
        "minimum": 0
      },
      "retry_on_error_pattern": {
        "type": "string",
        "description": "Only retry on specific error patterns (regex).",
        "nullable": true
      }
    }
  },
  "LoopStep": {
    "type": "object",
    "description": "Step: Loop over items or repeat N times.",
    "required": [
      "strategy",
      "body"
    ],
    "properties": {
      "body": {
        "$ref": "#/components/schemas/Workflow"
      },
      "name": {
        "type": "string",
        "description": "Optional name for the combined output.",
        "nullable": true
      },
      "reducer": {
        "allOf": [
          {
            "$ref": "#/components/schemas/ParallelReducer"
          }
        ],
        "nullable": true
      },
      "resume_policy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StepResumePolicy"
          }
        ],
        "nullable": true
      },
      "strategy": {
        "$ref": "#/components/schemas/LoopStrategy"
      }
    }
  },
  "LoopStrategy": {
    "oneOf": [
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "description": "Iterate over items in an array from a named output or current value.",
            "required": [
              "source"
            ],
            "properties": {
              "index_var": {
                "type": "string",
                "description": "Variable name to use for current index in loop body (default: \"index\").",
                "nullable": true
              },
              "item_var": {
                "type": "string",
                "description": "Variable name to use for current item in loop body (default: \"item\").",
                "nullable": true
              },
              "path": {
                "type": "string",
                "description": "Optional JSON path to extract array from source.",
                "nullable": true
              },
              "source": {
                "type": "string",
                "description": "Source of the array (named output or \"last\" or \"input\")."
              }
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "ForEach"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "description": "Repeat N times.",
            "required": [
              "count"
            ],
            "properties": {
              "count": {
                "type": "integer",
                "format": "int32",
                "description": "Number of iterations.",
                "minimum": 0
              },
              "index_var": {
                "type": "string",
                "description": "Variable name to use for current iteration number (default: \"index\").",
                "nullable": true
              }
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "Repeat"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "description": "While condition is true (evaluated via template or agent).",
            "required": [
              "condition",
              "max_iterations"
            ],
            "properties": {
              "condition": {
                "$ref": "#/components/schemas/LoopCondition"
              },
              "max_iterations": {
                "type": "integer",
                "format": "int32",
                "description": "Maximum iterations to prevent infinite loops.",
                "minimum": 0
              }
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "While"
            ]
          }
        }
      }
    ],
    "description": "Loop iteration strategy.",
    "discriminator": {
      "propertyName": "type"
    }
  },
  "LoopCondition": {
    "oneOf": [
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "description": "Template that should evaluate to \"true\" or \"false\".",
            "required": [
              "template"
            ],
            "properties": {
              "template": {
                "type": "string"
              }
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "Template"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "description": "Agent that returns \"true\" or \"false\".",
            "required": [
              "agent_id"
            ],
            "properties": {
              "agent_id": {
                "type": "string",
                "format": "uuid"
              }
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "Agent"
            ]
          }
        }
      }
    ],
    "description": "Loop condition evaluation.",
    "discriminator": {
      "propertyName": "type"
    }
  },
  "ImageProcessStep": {
    "type": "object",
    "description": "Step: Preprocess images before sending to vision-capable LLMs.",
    "required": [
      "op",
      "source"
    ],
    "properties": {
      "name": {
        "type": "string",
        "description": "Optional name to store the result in named_outputs.",
        "nullable": true
      },
      "op": {
        "$ref": "#/components/schemas/ImageProcessOp"
      },
      "resume_policy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StepResumePolicy"
          }
        ],
        "nullable": true
      },
      "source": {
        "type": "string",
        "description": "Source of the image:\n- \"attachment:N\" (0-4) to reference an attachment by index\n- \"{{variable}}\" to use a template variable containing a URL\n- \"last\" to use the output of the previous step\n- Direct HTTP(S) URL or base64 PNG/JPEG/WebP data URL.\n\nTransforms return a bounded data URL, never the original source URL."
      }
    },
    "additionalProperties": false
  },
  "ImageProcessOp": {
    "oneOf": [
      {
        "type": "object",
        "required": [
          "op",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "description": "Transform an image with flexible size and quality settings.",
            "properties": {
              "format": {
                "type": "string",
                "description": "Target format: \"jpeg\", \"png\", \"webp\" (optional - if not specified, keeps original format).",
                "nullable": true
              },
              "quality": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ImageQuality"
                  }
                ],
                "nullable": true
              },
              "size": {
                "allOf": [
                  {
                    "$ref": "#/components/schemas/ImageSize"
                  }
                ],
                "nullable": true
              }
            }
          },
          "op": {
            "type": "string",
            "enum": [
              "Transform"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "op",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "description": "Optimize image for LLM vision models with a simple detail level setting.\nThis is a convenience operation that combines resize + compress with optimal settings.",
            "required": [
              "detail"
            ],
            "properties": {
              "detail": {
                "type": "string",
                "description": "Target detail level: \"low\", \"high\", or \"auto\".\n- \"low\": 512px max, quality 80, optimized for token efficiency\n- \"high\": 2048px max, quality 90, optimized for detail\n- \"auto\": Low for images at most 512px on both axes, high otherwise."
              }
            }
          },
          "op": {
            "type": "string",
            "enum": [
              "OptimizeForLlm"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "op"
        ],
        "properties": {
          "op": {
            "type": "string",
            "enum": [
              "Metadata"
            ]
          }
        }
      }
    ],
    "description": "Image processing operations for preprocessing images before vision models.",
    "discriminator": {
      "propertyName": "op"
    }
  },
  "ImageQuality": {
    "type": "object",
    "description": "Image quality settings for lossy compression.",
    "properties": {
      "level": {
        "type": "integer",
        "format": "int32",
        "description": "Quality level 1-100 (higher = better quality, larger file).\nDefault: 85",
        "minimum": 0
      },
      "optimize": {
        "type": "boolean",
        "description": "Request metadata stripping on re-encoding. Transforms always strip source\nmetadata; this flag never enables unbounded encoder search.\nDefault: false"
      }
    },
    "additionalProperties": false
  },
  "ImageSize": {
    "oneOf": [
      {
        "type": "object",
        "required": [
          "type",
          "value"
        ],
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "Absolute"
            ]
          },
          "value": {
            "type": "object",
            "description": "Absolute dimensions in pixels (maintains aspect ratio, fits within bounds).",
            "required": [
              "max_width",
              "max_height"
            ],
            "properties": {
              "max_height": {
                "type": "integer",
                "format": "int32",
                "minimum": 0
              },
              "max_width": {
                "type": "integer",
                "format": "int32",
                "minimum": 0
              }
            }
          }
        }
      },
      {
        "type": "object",
        "required": [
          "type",
          "value"
        ],
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "Percent"
            ]
          },
          "value": {
            "type": "integer",
            "format": "int32",
            "description": "Percentage scale (e.g., 50 = 50% of original size).",
            "minimum": 0
          }
        }
      },
      {
        "type": "object",
        "required": [
          "type",
          "value"
        ],
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "Preset"
            ]
          },
          "value": {
            "$ref": "#/components/schemas/ImageSizePreset"
          }
        }
      }
    ],
    "description": "Image size specification - supports absolute dimensions, percentage scale, or presets.",
    "discriminator": {
      "propertyName": "type"
    }
  },
  "ImageSizePreset": {
    "type": "string",
    "description": "Preset image sizes for common scenarios.",
    "enum": [
      "thumbnail",
      "small",
      "medium",
      "large",
      "llm_low",
      "llm_high",
      "original"
    ]
  },
  "GenerateStep": {
    "type": "object",
    "description": "Step: Use an LLM to produce structured JSON output.\n\nSupports agent resolution (inline or DB), complete bounded JSON Schema validation,\nretry logic for malformed responses, conversation memory and explicit Gate tools.",
    "properties": {
      "agent": {
        "allOf": [
          {
            "$ref": "#/components/schemas/InlineAgentConfig"
          }
        ],
        "nullable": true
      },
      "agent_id": {
        "type": "string",
        "format": "uuid",
        "description": "UUID of the agent to invoke (mutually exclusive with `agent`).",
        "nullable": true
      },
      "exclude_mcp_servers": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "MCP servers to exclude from tool resolution for this step.\nBy default all MCP servers are available; list server names here to opt-out."
      },
      "fallback": {
        "allOf": [
          {
            "$ref": "#/components/schemas/Workflow"
          }
        ],
        "nullable": true
      },
      "image_urls": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Optional list of image URLs to include with the generation prompt (for vision models).\nCan use template variables like \"{{attachment_0}}\" or \"{{optimized_image}}\".",
        "nullable": true
      },
      "include_attachments": {
        "type": "boolean",
        "description": "If true, automatically include all image attachments from the workflow request."
      },
      "inline_tools": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/InlineToolSpec"
        },
        "description": "Inline tool definitions — built-in tools configured directly on the step.\nThese are synthesized into ToolRows at execution time (no DB lookup).\nExplicit Gate tools retain durable clarification; resumed final output still validates."
      },
      "input_template": {
        "type": "string",
        "description": "Optional input template (may reference {{input}}, {{last}}, named outputs, etc.).",
        "nullable": true
      },
      "max_retries": {
        "type": "integer",
        "format": "int32",
        "description": "Maximum number of retry attempts if JSON parsing/validation fails (default 0).",
        "minimum": 0
      },
      "memory": {
        "type": "boolean",
        "description": "Explicit opt-in to use conversation memory for this step (default off).",
        "nullable": true
      },
      "memory_record_original_input": {
        "type": "boolean",
        "description": "If true, record the original user input (ctx.initial_input) instead of step_input when writing to memory."
      },
      "memory_window_messages": {
        "type": "integer",
        "format": "int32",
        "description": "Optional memory window by count of messages to include when memory is enabled.",
        "nullable": true,
        "minimum": 0
      },
      "memory_window_tokens": {
        "type": "integer",
        "format": "int32",
        "description": "Optional memory window by token budget to include when memory is enabled.",
        "nullable": true,
        "minimum": 0
      },
      "name": {
        "type": "string",
        "description": "Optional name for the result (lets later steps reference this output by name).",
        "nullable": true
      },
      "resume_policy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StepResumePolicy"
          }
        ],
        "nullable": true
      },
      "retry": {
        "allOf": [
          {
            "$ref": "#/components/schemas/RetryPolicy"
          }
        ],
        "nullable": true
      },
      "schema": {
        "type": "object",
        "description": "Optional JSON Schema Draft 7 subset; absence permits any complete JSON value.\nSupports boolean schemas, type (including unions), enum/const, nested properties,\nrequired, schema/boolean additionalProperties and items, numeric bounds/multipleOf,\nstring length and collection size bounds, and descriptive annotations.\nSchema admission rejects unknown keywords, references, regex/format, combinators,\ntuples and uniqueItems. Limits: 64 KiB JSON, depth 32, 4096 JSON nodes, 256 subschemas.\nCompiled before provider work; every complete response is validated before publication."
      },
      "tool_agent_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        },
        "description": "Optional \"agent tools\" represented as agent ids (agent-as-tool).\nWhen provided, the target agent may use these tool agents to fulfill the request."
      }
    }
  },
  "InlineToolSpec": {
    "type": "object",
    "description": "An inline tool definition — embedded directly in a workflow step's JSON\nrather than referencing a DB-stored tool by id.",
    "required": [
      "name",
      "spec"
    ],
    "properties": {
      "description": {
        "type": "string",
        "description": "Optional description (helps the LLM choose when to invoke the tool).",
        "nullable": true
      },
      "name": {
        "type": "string",
        "description": "Display name for the tool (shown to the LLM)."
      },
      "spec": {
        "type": "object",
        "description": "Tool spec in the same format as `ToolRow.spec`\n(contains `kind`, `input_schema`, and kind-specific fields)."
      }
    }
  },
  "GateStep": {
    "type": "object",
    "description": "Step: Pause the workflow and wait for human input before continuing.",
    "required": [
      "gate_type",
      "prompt"
    ],
    "properties": {
      "gate_type": {
        "$ref": "#/components/schemas/GateType"
      },
      "guardian_rule_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        },
        "description": "Guardian rules explicitly assigned to this step. Rules with\norganization applicability apply without being listed here."
      },
      "metadata": {
        "type": "object",
        "description": "Optional metadata to attach to the gate record."
      },
      "name": {
        "type": "string",
        "description": "Optional name for the result (lets later steps reference the gate response).",
        "nullable": true
      },
      "options": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Required for Select gates: the options to choose from.",
        "nullable": true
      },
      "prompt": {
        "type": "string",
        "description": "Prompt to display to the user (supports {{input}}, {{last}}, etc.)."
      },
      "resume_policy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StepResumePolicy"
          }
        ],
        "nullable": true
      },
      "timeout_action": {
        "allOf": [
          {
            "$ref": "#/components/schemas/GateTimeoutAction"
          }
        ],
        "nullable": true
      },
      "timeout_seconds": {
        "type": "integer",
        "format": "int64",
        "description": "Optional timeout, in seconds, after which the gate is eligible for expiry handling.",
        "nullable": true,
        "minimum": 0
      }
    }
  },
  "GateType": {
    "type": "string",
    "description": "Gate type for human-in-the-loop steps.",
    "enum": [
      "approval",
      "input",
      "select"
    ]
  },
  "GateTimeoutAction": {
    "type": "string",
    "description": "Default action to apply when a gate expires.",
    "enum": [
      "approve",
      "reject",
      "skip"
    ]
  },
  "SupervisorStep": {
    "type": "object",
    "description": "Step: A meta-agent that dynamically plans and delegates tasks to specialist agents.\n\nThe supervisor agent only gets agent-tools (no DB tools) — clean separation\nof planner vs executor. It dynamically decides which agents to call and when\nthe task is complete.",
    "required": [
      "supervisor_agent_id",
      "available_agents"
    ],
    "properties": {
      "available_agents": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/AvailableAgent"
        },
        "description": "Agents available for delegation."
      },
      "exclude_mcp_servers": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "MCP servers to exclude from tool resolution for this step.\nBy default all MCP servers are available; list server names here to opt-out."
      },
      "fallback": {
        "allOf": [
          {
            "$ref": "#/components/schemas/Workflow"
          }
        ],
        "nullable": true
      },
      "guardian_rule_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        },
        "description": "Assigned rules constrain the supervisor and every owned specialist."
      },
      "human_input": {
        "allOf": [
          {
            "$ref": "#/components/schemas/HumanInputConfig"
          }
        ],
        "nullable": true
      },
      "input_template": {
        "type": "string",
        "description": "Optional input template.",
        "nullable": true
      },
      "max_turns": {
        "type": "integer",
        "format": "int32",
        "description": "Maximum agentic loop iterations (default: MAX_TOOL_ITERATIONS = 10).",
        "nullable": true,
        "minimum": 0
      },
      "memory": {
        "type": "boolean",
        "description": "Explicit opt-in to conversation memory.",
        "nullable": true
      },
      "memory_record_original_input": {
        "type": "boolean"
      },
      "memory_window_messages": {
        "type": "integer",
        "format": "int32",
        "nullable": true,
        "minimum": 0
      },
      "memory_window_tokens": {
        "type": "integer",
        "format": "int32",
        "nullable": true,
        "minimum": 0
      },
      "name": {
        "type": "string",
        "description": "Optional name for the result.",
        "nullable": true
      },
      "planning_prompt": {
        "type": "string",
        "description": "Optional planning prompt appended to the supervisor agent's system prompt.",
        "nullable": true
      },
      "resume_policy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StepResumePolicy"
          }
        ],
        "nullable": true
      },
      "retry": {
        "allOf": [
          {
            "$ref": "#/components/schemas/RetryPolicy"
          }
        ],
        "nullable": true
      },
      "supervisor_agent_id": {
        "type": "string",
        "format": "uuid",
        "description": "UUID of the supervisor/planner agent."
      }
    }
  },
  "AvailableAgent": {
    "type": "object",
    "description": "An agent available to the Supervisor for delegation.",
    "required": [
      "agent_id"
    ],
    "properties": {
      "agent_id": {
        "type": "string",
        "format": "uuid",
        "description": "UUID of the agent."
      },
      "description": {
        "type": "string",
        "description": "Optional description override (used in the tool definition shown to the supervisor).\nFalls back to the agent's DB description if not set.",
        "nullable": true
      }
    }
  },
  "HumanInputConfig": {
    "type": "object",
    "description": "Human-input controls for an Agent or Supervisor and its owned specialists.\nOmission preserves legacy configured-tool behavior; it does not disable input.",
    "required": [
      "enabled",
      "allowed_types"
    ],
    "properties": {
      "allowed_types": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/GateType"
        }
      },
      "enabled": {
        "type": "boolean"
      }
    }
  },
  "FanOutStep": {
    "type": "object",
    "description": "Step: Fan out over a dynamic runtime array with concurrent branch execution.\n\nTakes an array produced at runtime (e.g., from a Generate step) and processes\neach item concurrently through branch workflows, with optional grouping support.",
    "required": [
      "source",
      "strategy"
    ],
    "properties": {
      "group_var": {
        "type": "string",
        "description": "Variable name for the group key in branch context (default: \"group\").",
        "nullable": true
      },
      "index_var": {
        "type": "string",
        "description": "Variable name for the current index in branch context (default: \"index\").",
        "nullable": true
      },
      "item_var": {
        "type": "string",
        "description": "Variable name for the current item in branch context (default: \"item\").",
        "nullable": true
      },
      "max_concurrency": {
        "type": "integer",
        "format": "int32",
        "description": "Optional lower-only branch concurrency; None inherits the run cap (default four).",
        "nullable": true,
        "minimum": 0
      },
      "name": {
        "type": "string",
        "description": "Optional name for the combined output (referenced by later steps as {{name}}).",
        "nullable": true
      },
      "on_error": {
        "$ref": "#/components/schemas/FanOutErrorPolicy"
      },
      "path": {
        "type": "string",
        "description": "Optional JSON path into the source value to extract the array.",
        "nullable": true
      },
      "reducer": {
        "allOf": [
          {
            "$ref": "#/components/schemas/ParallelReducer"
          }
        ],
        "nullable": true
      },
      "resume_policy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StepResumePolicy"
          }
        ],
        "nullable": true
      },
      "source": {
        "type": "string",
        "description": "Source of the array (named output, \"last\", or \"input\"). Supports template variables."
      },
      "strategy": {
        "$ref": "#/components/schemas/FanOutStrategy"
      },
      "streaming_strategy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StreamingStrategy"
          }
        ],
        "nullable": true
      }
    }
  },
  "FanOutErrorPolicy": {
    "type": "string",
    "description": "Error policy for FanOut step when a branch fails.",
    "enum": [
      "fail_fast",
      "continue"
    ]
  },
  "FanOutStrategy": {
    "oneOf": [
      {
        "type": "object",
        "description": "One branch per item, all using the same template workflow.",
        "required": [
          "branch_template",
          "type"
        ],
        "properties": {
          "branch_template": {
            "$ref": "#/components/schemas/Workflow"
          },
          "type": {
            "type": "string",
            "enum": [
              "Each"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Group items by a key field and route each group to a different branch workflow.",
        "required": [
          "key",
          "branches",
          "type"
        ],
        "properties": {
          "branches": {
            "type": "object",
            "additionalProperties": {
              "$ref": "#/components/schemas/Workflow"
            }
          },
          "key": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "GroupBy"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Group items by a tags field (array of strings) and run matching branches for each tag.\nAn item can produce multiple branches if it has multiple matching tags.",
        "required": [
          "tags_field",
          "branches",
          "type"
        ],
        "properties": {
          "branches": {
            "type": "object",
            "additionalProperties": {
              "$ref": "#/components/schemas/Workflow"
            }
          },
          "tags_field": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "GroupByTags"
            ]
          }
        }
      }
    ],
    "description": "Strategy for distributing items across branches in a FanOut step.",
    "discriminator": {
      "propertyName": "type"
    }
  },
  "KnowledgeStep": {
    "type": "object",
    "description": "Step: Vector similarity search against one or more knowledge sources.\n\nEmbeds a query, searches pgvector, and formats results for downstream consumption\n(typically injected into a Prompt step's context). The embedding model is determined\nby the source config, ensuring queries match the stored chunk embeddings.",
    "properties": {
      "condition": {
        "allOf": [
          {
            "$ref": "#/components/schemas/Condition"
          }
        ],
        "nullable": true
      },
      "excluded_tags": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Excluded tags — none may be present on matching chunks."
      },
      "fallback": {
        "allOf": [
          {
            "$ref": "#/components/schemas/Workflow"
          }
        ],
        "nullable": true
      },
      "include_metadata": {
        "type": "boolean",
        "description": "Include chunk metadata in output (default: false).",
        "nullable": true
      },
      "knowledge_base_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        },
        "description": "Knowledge base IDs — resolved to source_ids at runtime.\nWhen a KB is referenced, ALL its current sources are included in the search."
      },
      "metadata_filter": {
        "type": "object",
        "description": "Optional JSONB metadata filter (e.g., {\"category\": \"api\"})."
      },
      "name": {
        "type": "string",
        "description": "Optional name for the output (referenced by later steps as {{name}}).",
        "nullable": true
      },
      "output_format": {
        "allOf": [
          {
            "$ref": "#/components/schemas/KnowledgeOutputFormat"
          }
        ],
        "nullable": true
      },
      "query_template": {
        "type": "string",
        "description": "Template for the search query (supports {{input}}, {{last}}, named outputs).\nFalls back to the current context value ({{last}} or {{input}}) if not set.",
        "nullable": true
      },
      "required_tags": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Required tags — all must be present on matching chunks."
      },
      "rerank": {
        "allOf": [
          {
            "$ref": "#/components/schemas/RerankConfig"
          }
        ],
        "nullable": true
      },
      "resume_policy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StepResumePolicy"
          }
        ],
        "nullable": true
      },
      "retry": {
        "allOf": [
          {
            "$ref": "#/components/schemas/RetryPolicy"
          }
        ],
        "nullable": true
      },
      "search_mode": {
        "allOf": [
          {
            "$ref": "#/components/schemas/KnowledgeSearchMode"
          }
        ],
        "nullable": true
      },
      "similarity_threshold": {
        "type": "number",
        "format": "float",
        "description": "Minimum similarity score 0.0-1.0 (default: 0.7).",
        "nullable": true
      },
      "source_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        },
        "description": "Knowledge source IDs to search (supports multi-source queries)."
      },
      "top_k": {
        "type": "integer",
        "format": "int32",
        "description": "Maximum number of results to return (default: 5).",
        "nullable": true,
        "minimum": 0
      },
      "vector_weight": {
        "type": "number",
        "format": "float",
        "description": "Weight for vector vs text results in hybrid mode (0.0 = text only, 1.0 = vector only, default: 0.5).",
        "nullable": true
      }
    }
  },
  "KnowledgeOutputFormat": {
    "type": "string",
    "description": "Output format for knowledge retrieval results.",
    "enum": [
      "Text",
      "Json",
      "PromptContext"
    ]
  },
  "RerankConfig": {
    "type": "object",
    "description": "Configuration for LLM-based reranking of search results.",
    "properties": {
      "model": {
        "type": "string",
        "description": "LLM model for scoring relevance (default: \"gpt-4o-mini\")."
      },
      "provider": {
        "type": "string",
        "description": "LLM provider (default: \"openai\")."
      },
      "top_n": {
        "type": "integer",
        "format": "int32",
        "description": "Number of results to keep after reranking (default: same as top_k).",
        "nullable": true,
        "minimum": 0
      }
    }
  },
  "KnowledgeSearchMode": {
    "type": "string",
    "description": "Search mode for knowledge retrieval. Used by both the workflow `KnowledgeStep`\n(in `workflow::knowledge`) and the data layer's `KnowledgeDb::knowledge_search`\ntrait method, so it lives at the contracts boundary.",
    "enum": [
      "vector",
      "full_text",
      "hybrid"
    ]
  },
  "DataOpStep": {
    "type": "object",
    "description": "Step: Declarative tabular data manipulation.\n\nApplies a pipeline of operations (filter, sort, aggregate, join, etc.) to a\nJSON array of rows and returns JSON.",
    "required": [
      "operations"
    ],
    "properties": {
      "from": {
        "type": "string",
        "description": "Named output to use as input source (default: ctx.current()).",
        "nullable": true
      },
      "name": {
        "type": "string",
        "description": "Optional name for the output (referenced by later steps as {{name}}).",
        "nullable": true
      },
      "operations": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/DataOp"
        },
        "description": "Pipeline of operations applied sequentially to the row set."
      },
      "output_format": {
        "allOf": [
          {
            "$ref": "#/components/schemas/DataOpOutputFormat"
          }
        ],
        "nullable": true
      },
      "parameters": {
        "type": "object",
        "description": "Explicit bounded scalar parameters; never resolved from workflow context.",
        "additionalProperties": {}
      },
      "resume_policy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StepResumePolicy"
          }
        ],
        "nullable": true
      }
    }
  },
  "DataOp": {
    "oneOf": [
      {
        "type": "object",
        "description": "Keep only the specified columns.",
        "required": [
          "columns",
          "op"
        ],
        "properties": {
          "columns": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "op": {
            "type": "string",
            "enum": [
              "Select"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Filter rows by a boolean expression.",
        "required": [
          "expression",
          "op"
        ],
        "properties": {
          "expression": {
            "$ref": "#/components/schemas/FilterExpr"
          },
          "op": {
            "type": "string",
            "enum": [
              "Filter"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Sort rows by one or more columns.",
        "required": [
          "by",
          "op"
        ],
        "properties": {
          "by": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/SortColumn"
            }
          },
          "op": {
            "type": "string",
            "enum": [
              "Sort"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Limit the number of rows returned.",
        "required": [
          "count",
          "op"
        ],
        "properties": {
          "count": {
            "type": "integer",
            "minimum": 0
          },
          "offset": {
            "type": "integer",
            "nullable": true,
            "minimum": 0
          },
          "op": {
            "type": "string",
            "enum": [
              "Limit"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Rename columns.",
        "required": [
          "mapping",
          "op"
        ],
        "properties": {
          "mapping": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ColumnRename"
            }
          },
          "op": {
            "type": "string",
            "enum": [
              "Rename"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Remove duplicate rows (optionally on specific columns).",
        "required": [
          "op"
        ],
        "properties": {
          "columns": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "nullable": true
          },
          "op": {
            "type": "string",
            "enum": [
              "Distinct"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Group by columns and compute aggregates.",
        "required": [
          "by",
          "aggregates",
          "op"
        ],
        "properties": {
          "aggregates": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AggregateExpr"
            }
          },
          "by": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "op": {
            "type": "string",
            "enum": [
              "GroupBy"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Add a computed column.",
        "required": [
          "name",
          "expression",
          "op"
        ],
        "properties": {
          "expression": {
            "$ref": "#/components/schemas/ColumnExpr"
          },
          "name": {
            "type": "string"
          },
          "op": {
            "type": "string",
            "enum": [
              "AddColumn"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Join with another named output.",
        "required": [
          "right_from",
          "on",
          "op"
        ],
        "properties": {
          "join_type": {
            "$ref": "#/components/schemas/JoinType"
          },
          "on": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/JoinKey"
            }
          },
          "op": {
            "type": "string",
            "enum": [
              "Join"
            ]
          },
          "right_from": {
            "type": "string"
          }
        }
      },
      {
        "type": "object",
        "description": "Pivot (long → wide): spread a column's values into new columns.",
        "required": [
          "index",
          "columns",
          "values",
          "op"
        ],
        "properties": {
          "aggregate": {
            "$ref": "#/components/schemas/PivotAggregate"
          },
          "columns": {
            "type": "string"
          },
          "index": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "op": {
            "type": "string",
            "enum": [
              "Pivot"
            ]
          },
          "values": {
            "type": "string"
          }
        }
      },
      {
        "type": "object",
        "description": "Unpivot (wide → long): gather columns into key-value rows.",
        "required": [
          "id_vars",
          "value_vars",
          "op"
        ],
        "properties": {
          "id_vars": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "op": {
            "type": "string",
            "enum": [
              "Unpivot"
            ]
          },
          "value_name": {
            "type": "string",
            "nullable": true
          },
          "value_vars": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "variable_name": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "type": "object",
        "description": "Cast a column to a different type.",
        "required": [
          "column",
          "to_type",
          "op"
        ],
        "properties": {
          "column": {
            "type": "string"
          },
          "op": {
            "type": "string",
            "enum": [
              "Cast"
            ]
          },
          "to_type": {
            "$ref": "#/components/schemas/CastType"
          }
        }
      }
    ],
    "description": "A single data operation in a DataOp pipeline.",
    "discriminator": {
      "propertyName": "op"
    }
  },
  "SortColumn": {
    "type": "object",
    "description": "Sort column specification.",
    "required": [
      "column"
    ],
    "properties": {
      "ascending": {
        "type": "boolean"
      },
      "column": {
        "type": "string"
      }
    }
  },
  "ColumnRename": {
    "type": "object",
    "description": "Column rename mapping.",
    "required": [
      "from",
      "to"
    ],
    "properties": {
      "from": {
        "type": "string"
      },
      "to": {
        "type": "string"
      }
    }
  },
  "AggregateExpr": {
    "type": "object",
    "description": "Aggregate expression for GroupBy.",
    "required": [
      "column",
      "function"
    ],
    "properties": {
      "alias": {
        "type": "string",
        "description": "Output column alias (defaults to `{column}_{function}`).",
        "nullable": true
      },
      "column": {
        "type": "string",
        "description": "Source column name."
      },
      "function": {
        "$ref": "#/components/schemas/AggFunction"
      }
    }
  },
  "ColumnExpr": {
    "oneOf": [
      {
        "type": "object",
        "description": "Version 1 typed expression, sharing the predicate evaluator.",
        "required": [
          "version",
          "expression",
          "type"
        ],
        "properties": {
          "expression": {
            "$ref": "#/components/schemas/DataExpr"
          },
          "type": {
            "type": "string",
            "enum": [
              "Expression"
            ]
          },
          "version": {
            "type": "integer",
            "format": "int32",
            "minimum": 0
          }
        }
      },
      {
        "type": "object",
        "description": "A literal value.",
        "required": [
          "value",
          "type"
        ],
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "Literal"
            ]
          },
          "value": {}
        }
      },
      {
        "type": "object",
        "description": "Reference an existing column.",
        "required": [
          "source",
          "type"
        ],
        "properties": {
          "source": {
            "type": "string"
          },
          "type": {
            "type": "string",
            "enum": [
              "Column"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Arithmetic on two sub-expressions.",
        "required": [
          "left",
          "op",
          "right",
          "type"
        ],
        "properties": {
          "left": {
            "$ref": "#/components/schemas/ColumnExpr"
          },
          "op": {
            "$ref": "#/components/schemas/MathOp"
          },
          "right": {
            "$ref": "#/components/schemas/ColumnExpr"
          },
          "type": {
            "type": "string",
            "enum": [
              "Math"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "Concatenate string parts.",
        "required": [
          "parts",
          "type"
        ],
        "properties": {
          "parts": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ColumnExpr"
            }
          },
          "separator": {
            "type": "string",
            "nullable": true
          },
          "type": {
            "type": "string",
            "enum": [
              "Concat"
            ]
          }
        }
      },
      {
        "type": "object",
        "description": "If-then-else based on a filter condition.",
        "required": [
          "condition",
          "then_value",
          "else_value",
          "type"
        ],
        "properties": {
          "condition": {
            "$ref": "#/components/schemas/FilterExpr"
          },
          "else_value": {
            "$ref": "#/components/schemas/ColumnExpr"
          },
          "then_value": {
            "$ref": "#/components/schemas/ColumnExpr"
          },
          "type": {
            "type": "string",
            "enum": [
              "Conditional"
            ]
          }
        }
      }
    ],
    "description": "Column expression for computed columns (AddColumn).",
    "discriminator": {
      "propertyName": "type"
    }
  },
  "JoinType": {
    "type": "string",
    "description": "Join types.",
    "enum": [
      "inner",
      "left",
      "right",
      "outer",
      "cross"
    ]
  },
  "JoinKey": {
    "type": "object",
    "description": "Join key specification.",
    "required": [
      "left",
      "right"
    ],
    "properties": {
      "left": {
        "type": "string"
      },
      "right": {
        "type": "string"
      }
    }
  },
  "PivotAggregate": {
    "type": "string",
    "description": "Pivot aggregate function.",
    "enum": [
      "first",
      "sum",
      "mean",
      "count",
      "min",
      "max"
    ]
  },
  "DataOpOutputFormat": {
    "type": "string",
    "description": "Output format for DataOp results.",
    "enum": [
      "json_array",
      "json_rows",
      "csv",
      "summary"
    ]
  },
  "RulesetStep": {
    "type": "object",
    "description": "Step: Evaluate business rulesets against the current workflow context.\n\nEach ruleset is evaluated in priority order. When a ruleset's condition matches\nthe current context, its effects are applied. Effects include:\n- `set` — set a context value (variable/named_output)\n- `append_reason` — append a reason string to the step output\n- `set_output` — set a value in the step's JSON output\n\nRule decisions are captured in the step trace for auditability.",
    "required": [
      "rulesets"
    ],
    "properties": {
      "name": {
        "type": "string",
        "description": "Optional human-friendly name for the step.",
        "nullable": true
      },
      "resume_policy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StepResumePolicy"
          }
        ],
        "nullable": true
      },
      "ruleset_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        },
        "description": "References to stored ruleset IRs by UUID. Loaded from the control plane\nduring workflow resolution and merged with inline rulesets.",
        "maxItems": 32
      },
      "rulesets": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/RulesetIR"
        },
        "description": "Inline rulesets to evaluate. Each contains its own condition and effects.",
        "maxItems": 32
      }
    }
  },
  "RulesetIR": {
    "type": "object",
    "description": "Business ruleset IR stored in control plane.",
    "required": [
      "id",
      "schema_version",
      "name",
      "organization_id",
      "kind",
      "scope",
      "trigger",
      "condition",
      "effects",
      "priority",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "condition": {
        "$ref": "#/components/schemas/FilterExpr"
      },
      "created_at": {
        "type": "string",
        "format": "date-time"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "effects": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/RulesetEffect"
        },
        "maxItems": 64
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "kind": {
        "$ref": "#/components/schemas/RulesetKind"
      },
      "metadata": {
        "$ref": "#/components/schemas/PolicyMetadata"
      },
      "name": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "phase": {
        "$ref": "#/components/schemas/PolicyPhase"
      },
      "priority": {
        "type": "integer",
        "format": "int32"
      },
      "schema_version": {
        "type": "string"
      },
      "scope": {
        "$ref": "#/components/schemas/PolicyScope"
      },
      "trigger": {
        "$ref": "#/components/schemas/PolicyTrigger"
      },
      "updated_at": {
        "type": "string",
        "format": "date-time"
      }
    }
  },
  "RulesetEffect": {
    "oneOf": [
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "required": [
              "path",
              "value"
            ],
            "properties": {
              "path": {
                "type": "string",
                "maxLength": 512
              },
              "value": {}
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "set"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "required": [
              "path",
              "value"
            ],
            "properties": {
              "path": {
                "type": "string",
                "maxLength": 512
              },
              "value": {}
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "set_output"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "required": [
              "text"
            ],
            "properties": {
              "text": {
                "type": "string",
                "maxLength": 4096
              }
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "append_reason"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "required": [
              "path",
              "value"
            ],
            "properties": {
              "path": {
                "type": "string"
              },
              "value": {}
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "modify"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "required": [
              "message",
              "severity"
            ],
            "properties": {
              "message": {
                "type": "string"
              },
              "severity": {
                "type": "string"
              }
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "audit"
            ]
          }
        }
      }
    ],
    "description": "Ruleset effect - business logic outcomes.",
    "discriminator": {
      "propertyName": "type"
    }
  },
  "RulesetKind": {
    "oneOf": [
      {
        "type": "string",
        "enum": [
          "pricing"
        ]
      },
      {
        "type": "string",
        "enum": [
          "validation"
        ]
      },
      {
        "type": "string",
        "enum": [
          "transformation"
        ]
      },
      {
        "type": "object",
        "required": [
          "custom"
        ],
        "properties": {
          "custom": {
            "type": "string"
          }
        }
      }
    ],
    "description": "Ruleset kind - business logic type."
  },
  "PolicyMetadata": {
    "type": "object",
    "description": "Policy metadata - applicability filtering.",
    "properties": {
      "channels": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "custom": {
        "type": "object",
        "additionalProperties": {
          "type": "string"
        }
      },
      "effective_from": {
        "type": "string",
        "format": "date-time",
        "nullable": true
      },
      "effective_to": {
        "type": "string",
        "format": "date-time",
        "nullable": true
      },
      "entity_types": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "environments": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "products": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "regions": {
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    }
  },
  "PolicyPhase": {
    "oneOf": [
      {
        "type": "string",
        "enum": [
          "default"
        ]
      },
      {
        "type": "string",
        "enum": [
          "cost"
        ]
      },
      {
        "type": "string",
        "enum": [
          "security"
        ]
      },
      {
        "type": "string",
        "enum": [
          "business"
        ]
      },
      {
        "type": "object",
        "required": [
          "custom"
        ],
        "properties": {
          "custom": {
            "type": "string"
          }
        }
      }
    ],
    "description": "Policy phase - execution ordering."
  },
  "PolicyScope": {
    "oneOf": [
      {
        "type": "string",
        "enum": [
          "organization"
        ]
      },
      {
        "type": "string",
        "enum": [
          "system"
        ]
      },
      {
        "type": "string",
        "enum": [
          "environment"
        ]
      },
      {
        "type": "string",
        "enum": [
          "workflow"
        ]
      },
      {
        "type": "string",
        "enum": [
          "deployment"
        ]
      },
      {
        "type": "string",
        "enum": [
          "step"
        ]
      },
      {
        "type": "object",
        "required": [
          "custom"
        ],
        "properties": {
          "custom": {
            "type": "string"
          }
        }
      }
    ],
    "description": "Policy scope - where the policy applies."
  },
  "PolicyTrigger": {
    "oneOf": [
      {
        "type": "string",
        "enum": [
          "pre_execution"
        ]
      },
      {
        "type": "string",
        "enum": [
          "post_execution"
        ]
      },
      {
        "type": "string",
        "enum": [
          "pre_step"
        ]
      },
      {
        "type": "string",
        "enum": [
          "post_step"
        ]
      },
      {
        "type": "object",
        "required": [
          "domain_event"
        ],
        "properties": {
          "domain_event": {
            "type": "string"
          }
        }
      },
      {
        "type": "object",
        "required": [
          "custom"
        ],
        "properties": {
          "custom": {
            "type": "string"
          }
        }
      }
    ],
    "description": "Policy trigger - when the policy activates."
  },
  "ReportGenerateData": {
    "type": "object",
    "description": "Step: Generate a structured report from a template.\n\nResolves a template (stored or inline), builds a context from workflow state,\nand renders via the restricted Handlebars engine.",
    "required": [
      "name"
    ],
    "properties": {
      "context": {
        "type": "object",
        "description": "Maps template field keys to workflow template expressions.\nEach value is resolved using the standard `apply_template()` engine.",
        "additionalProperties": {
          "type": "string"
        }
      },
      "filename_template": {
        "type": "string",
        "description": "Template for the output filename (supports {{variables}}).",
        "nullable": true
      },
      "include_attachments": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/AttachmentBinding"
        },
        "description": "Optional: include attachments from referenced step outputs.",
        "nullable": true
      },
      "include_content_in_output": {
        "type": "boolean",
        "description": "Explicitly include rendered content in output (at most 256 KiB).\nDefaults to false; metadata references the durable report identifier."
      },
      "inline_template": {
        "type": "string",
        "description": "Inline template content (Markdown + Handlebars). Mutually exclusive with `template_id`.",
        "nullable": true
      },
      "name": {
        "type": "string",
        "description": "Required human-friendly name for the step output."
      },
      "output_format": {
        "$ref": "#/components/schemas/ReportOutputFormat"
      },
      "resume_policy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StepResumePolicy"
          }
        ],
        "nullable": true
      },
      "retry": {
        "allOf": [
          {
            "$ref": "#/components/schemas/RetryPolicy"
          }
        ],
        "nullable": true
      },
      "template_id": {
        "type": "string",
        "format": "uuid",
        "description": "UUID of a stored report template (mutually exclusive with `inline_template`).",
        "nullable": true
      },
      "template_version": {
        "type": "integer",
        "format": "int32",
        "description": "Pin to a specific template version. If omitted, uses the latest active version.",
        "nullable": true
      },
      "upload_to_storage": {
        "type": "boolean",
        "description": "Whether to upload the document to tenant storage; metadata is always persisted."
      }
    }
  },
  "AttachmentBinding": {
    "type": "object",
    "description": "Binds attachments from a named step output into the template context.",
    "required": [
      "from",
      "bind_to"
    ],
    "properties": {
      "bind_to": {
        "type": "string",
        "description": "Field name in the template context to bind these attachments to."
      },
      "from": {
        "type": "string",
        "description": "Source: which step's attachments to include (step name)."
      },
      "mime_filter": {
        "type": "string",
        "description": "Filter by mime type prefix (e.g., \"image/\" for all images).",
        "nullable": true
      }
    }
  },
  "ReportOutputFormat": {
    "type": "string",
    "description": "Output format for rendered reports.",
    "enum": [
      "markdown",
      "html",
      "pdf"
    ]
  },
  "ClassificationStep": {
    "type": "object",
    "description": "Step: Classify input using structured questions routed to the Laya-AI service.\n\nA non-streaming, single-forward-pass step that sends questions to the\n`laya-serve` HTTP service. Each question has a type (choice, score, or NouL)\nand criteria that define the acceptable answer space.",
    "required": [
      "connection_id",
      "state",
      "questions"
    ],
    "properties": {
      "connection_id": {
        "type": "string",
        "format": "uuid",
        "description": "UUID of the connection to the Laya-AI service."
      },
      "name": {
        "type": "string",
        "description": "Optional name for the result (lets later steps reference this output by name).",
        "nullable": true
      },
      "questions": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/QuestionDef"
        },
        "description": "Questions to evaluate during classification."
      },
      "resume_policy": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StepResumePolicy"
          }
        ],
        "nullable": true
      },
      "retry": {
        "allOf": [
          {
            "$ref": "#/components/schemas/RetryPolicy"
          }
        ],
        "nullable": true
      },
      "state": {
        "type": "string",
        "description": "The classification text/document: literal or a `{{ }}` template resolved\nfrom the workflow context (`input`, `last`, named step outputs), with\nobjects serialized as JSON."
      }
    }
  },
  "QuestionDef": {
    "type": "object",
    "description": "A single classification question with its type and acceptance criteria.",
    "required": [
      "id",
      "question_type",
      "instructions"
    ],
    "properties": {
      "criteria": {
        "allOf": [
          {
            "$ref": "#/components/schemas/QuestionCriteria"
          }
        ],
        "nullable": true
      },
      "id": {
        "type": "string",
        "description": "Stable identifier for this question within the classification."
      },
      "instructions": {
        "type": "string",
        "description": "Instructions for how to answer this question."
      },
      "question_type": {
        "$ref": "#/components/schemas/QuestionType"
      }
    }
  },
  "QuestionCriteria": {
    "oneOf": [
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "description": "Labeled choices for multiple-choice questions.",
            "additionalProperties": {
              "type": "string"
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "choices"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Ordered score levels for scoring questions."
          },
          "type": {
            "type": "string",
            "enum": [
              "score_levels"
            ]
          }
        }
      }
    ],
    "description": "Acceptance criteria for a classification question.",
    "discriminator": {
      "propertyName": "type"
    }
  },
  "QuestionType": {
    "type": "string",
    "description": "The type of a classification question.",
    "enum": [
      "choice",
      "score",
      "nou_l"
    ]
  },
  "AgentUpdate": {
    "type": "object",
    "description": "Partial update payload for agents (all fields optional).",
    "properties": {
      "completion_node_model_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "fallback_model_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "model_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "system_prompt_id": {
        "type": "string",
        "format": "uuid",
        "description": "Omitted preserves the link; JSON null removes it; a UUID replaces it.",
        "nullable": true
      }
    }
  },
  "AgentWithTools": {
    "type": "object",
    "description": "Agent with its linked tool summaries.",
    "required": [
      "id",
      "name",
      "model_provider",
      "model_name",
      "tools"
    ],
    "properties": {
      "description": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "model_name": {
        "type": "string"
      },
      "model_provider": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "tools": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/ToolSummary"
        }
      }
    }
  },
  "ApiUsage": {
    "type": "object",
    "required": [
      "id",
      "organization_id",
      "endpoint",
      "method",
      "created_at"
    ],
    "properties": {
      "agent_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "cost_is_estimated": {
        "type": "boolean"
      },
      "cost_usd": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "created_at": {
        "type": "string",
        "format": "date-time"
      },
      "endpoint": {
        "type": "string"
      },
      "error_message": {
        "type": "string",
        "nullable": true
      },
      "execution_time_ms": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "input_tokens": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "llm_model": {
        "type": "string",
        "nullable": true
      },
      "llm_provider": {
        "type": "string",
        "nullable": true
      },
      "method": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "output_tokens": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "status_code": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "tokens_used": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "user_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "workflow_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    }
  },
  "Attachment": {
    "type": "object",
    "description": "An attachment (image or file) passed with a workflow request.\nMaximum 5 attachments per request.",
    "required": [
      "attachment_type",
      "url",
      "media_type",
      "filename"
    ],
    "properties": {
      "attachment_type": {
        "type": "string",
        "description": "Type of attachment: \"image\" or \"file\""
      },
      "filename": {
        "type": "string",
        "description": "Display filename (e.g., \"vacation_photo.png\")"
      },
      "media_type": {
        "type": "string",
        "description": "MIME type (e.g., \"image/png\", \"image/jpeg\", \"application/pdf\")"
      },
      "url": {
        "type": "string",
        "description": "URL to the attachment (Supabase Storage or external URL)"
      }
    }
  },
  "AuditLog": {
    "type": "object",
    "required": [
      "id",
      "action",
      "created_at"
    ],
    "properties": {
      "action": {
        "type": "string"
      },
      "changes": {
        "nullable": true
      },
      "created_at": {
        "type": "string",
        "format": "date-time"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "ip_address": {
        "type": "string",
        "nullable": true
      },
      "organization_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "resource_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "resource_type": {
        "type": "string",
        "nullable": true
      },
      "user_agent": {
        "type": "string",
        "nullable": true
      },
      "user_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    }
  },
  "AuthorizationInfo": {
    "type": "object",
    "required": [
      "authorization_url",
      "transaction_id",
      "expires_at"
    ],
    "properties": {
      "authorization_url": {
        "type": "string"
      },
      "expires_at": {
        "type": "string",
        "format": "date-time"
      },
      "transaction_id": {
        "type": "string",
        "format": "uuid"
      }
    }
  },
  "AuthorizeRequest": {
    "type": "object",
    "required": [
      "provider",
      "name"
    ],
    "properties": {
      "name": {
        "type": "string"
      },
      "provider": {
        "type": "string"
      }
    },
    "additionalProperties": false
  },
  "CallbackRequest": {
    "type": "object",
    "required": [
      "state",
      "code"
    ],
    "properties": {
      "code": {
        "type": "string"
      },
      "state": {
        "type": "string"
      }
    },
    "additionalProperties": false
  },
  "CancelWorkflowRunResponse": {
    "type": "object",
    "description": "`POST /api/workflows/runs/{run_id}/cancel`\n\nSignals cooperative cancellation for a durable run executing in this\nprocess. A terminal run is reported as-is so a repeated cancel cannot\noverwrite its outcome; a run executing elsewhere is reported as\nnot active rather than pretending it stopped.",
    "required": [
      "run_id",
      "status",
      "requested"
    ],
    "properties": {
      "requested": {
        "type": "boolean",
        "description": "Whether this request signalled the run or recorded its cancellation."
      },
      "run_id": {
        "type": "string",
        "format": "uuid"
      },
      "status": {
        "$ref": "#/components/schemas/RunState"
      }
    }
  },
  "RunState": {
    "type": "string",
    "description": "Public run state. This is a closed set: clients switch on these values\ninstead of inferring a state from a string.\n\nEach terminal outcome carries a documented reason code. A `failed` run\nrecords `error.error_kind` (`Agent`, `Guardian`, `ToolExecution`,\n`InvalidConfig`, `NoMatch`, `Resolution`, `Gate`, `Persistence`, `Other`);\na `cancelled` run records `error.reason` `cancelled` and its stream emits a\n`cancelled` event whose `reason` is `user_cancelled`; an `incomplete` run\nrecords the missing continuation that halted it.",
    "enum": [
      "running",
      "waiting_for_input",
      "completed",
      "failed",
      "cancelled",
      "incomplete"
    ]
  },
  "ChatCompletionMessage": {
    "type": "object",
    "description": "One chat message. Only text content is accepted on this surface.",
    "required": [
      "role",
      "content"
    ],
    "properties": {
      "content": {
        "type": "string",
        "description": "Non-empty text content."
      },
      "role": {
        "$ref": "#/components/schemas/ChatRole"
      }
    },
    "additionalProperties": false
  },
  "ChatRole": {
    "type": "string",
    "description": "Allowed message roles.",
    "enum": [
      "system",
      "user",
      "assistant"
    ]
  },
  "ChatCompletionRequest": {
    "type": "object",
    "description": "The supported subset of an OpenAI chat completion request.\n\nTools, images, audio, embeddings, and tenant credentials are intentionally\nabsent and rejected as unknown fields.",
    "required": [
      "model",
      "messages"
    ],
    "properties": {
      "max_tokens": {
        "type": "integer",
        "format": "int32",
        "description": "Requested output token bound, within the configured maximum.",
        "nullable": true,
        "minimum": 0
      },
      "messages": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/ChatCompletionMessage"
        },
        "description": "Non-empty conversation, bounded by configured count and byte limits."
      },
      "model": {
        "type": "string",
        "description": "Exact configured model id."
      },
      "reasoning_effort": {
        "type": "string",
        "description": "Reasoning effort hint: `low`, `medium`, or `high`.",
        "nullable": true
      },
      "stream": {
        "type": "boolean",
        "description": "Stream OpenAI SSE instead of one JSON response."
      }
    },
    "additionalProperties": false
  },
  "ChatProduct": {
    "type": "object",
    "description": "Full chat product row from `agent_factory.chat_products`.",
    "required": [
      "id",
      "name",
      "slug",
      "workflow_id",
      "access_level",
      "is_active",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "access_level": {
        "type": "string"
      },
      "appearance": {
        "nullable": true
      },
      "created_at": {
        "type": "string"
      },
      "created_by": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "deployment_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "environment_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "is_active": {
        "type": "boolean"
      },
      "name": {
        "type": "string"
      },
      "slug": {
        "type": "string"
      },
      "system_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "system_prompt_override": {
        "type": "string",
        "nullable": true
      },
      "updated_at": {
        "type": "string"
      },
      "welcome_message": {
        "type": "string",
        "nullable": true
      },
      "workflow_id": {
        "type": "string",
        "format": "uuid"
      }
    }
  },
  "ChatProductAccessRule": {
    "type": "object",
    "description": "Full access rule row from `agent_factory.chat_product_access`.",
    "required": [
      "id",
      "chat_product_id",
      "group_id",
      "created_at"
    ],
    "properties": {
      "chat_product_id": {
        "type": "string",
        "format": "uuid"
      },
      "created_at": {
        "type": "string"
      },
      "group_id": {
        "type": "string",
        "format": "uuid"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      }
    }
  },
  "ChatProductAccessRuleInput": {
    "type": "object",
    "description": "Individual access rule input (group_id only).",
    "required": [
      "group_id"
    ],
    "properties": {
      "group_id": {
        "type": "string",
        "format": "uuid"
      }
    }
  },
  "ChatProductAccessUpdateResponse": {
    "type": "object",
    "description": "Request body for PUT /api/chat-products/{id}/access.",
    "required": [
      "access_rules"
    ],
    "properties": {
      "access_rules": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/ChatProductAccessRule"
        }
      }
    }
  },
  "ChatSendMessageRequest": {
    "type": "object",
    "description": "Request body for POST /api/chat-products/{id}/send.",
    "required": [
      "message"
    ],
    "properties": {
      "attachments": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/Attachment"
        },
        "nullable": true
      },
      "conversation_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "message": {
        "type": "string"
      }
    },
    "additionalProperties": false
  },
  "CheckpointMode": {
    "type": "string",
    "description": "Checkpoint mode for workflow run tracking and resume support.",
    "enum": [
      "none",
      "per_step",
      "on_failure"
    ]
  },
  "CompletionNodeModel": {
    "type": "object",
    "required": [
      "id",
      "organization_id",
      "node_id",
      "model_name",
      "display_name",
      "context_window",
      "max_output_tokens",
      "supports_function_calling",
      "supports_streaming"
    ],
    "properties": {
      "context_window": {
        "type": "integer",
        "format": "int32"
      },
      "display_name": {
        "type": "string"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "max_output_tokens": {
        "type": "integer",
        "format": "int32"
      },
      "model_name": {
        "type": "string"
      },
      "node_id": {
        "type": "string",
        "format": "uuid"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "supports_function_calling": {
        "type": "boolean"
      },
      "supports_streaming": {
        "type": "boolean"
      }
    }
  },
  "CompletionNodeModelInsert": {
    "type": "object",
    "required": [
      "node_id",
      "model_name",
      "display_name",
      "context_window",
      "max_output_tokens",
      "supports_function_calling",
      "supports_streaming"
    ],
    "properties": {
      "context_window": {
        "type": "integer",
        "format": "int32"
      },
      "display_name": {
        "type": "string"
      },
      "max_output_tokens": {
        "type": "integer",
        "format": "int32"
      },
      "model_name": {
        "type": "string"
      },
      "node_id": {
        "type": "string",
        "format": "uuid"
      },
      "supports_function_calling": {
        "type": "boolean"
      },
      "supports_streaming": {
        "type": "boolean"
      }
    },
    "additionalProperties": false
  },
  "CompletionNodeModelList": {
    "type": "object",
    "required": [
      "items"
    ],
    "properties": {
      "items": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/CompletionNodeModel"
        }
      }
    }
  },
  "ConnectionInfo": {
    "type": "object",
    "required": [
      "id",
      "organization_id",
      "owner_user_id",
      "provider",
      "name",
      "external_subject",
      "account_email",
      "status",
      "scopes",
      "created_at",
      "updated_at",
      "revision"
    ],
    "properties": {
      "account_email": {
        "type": "string"
      },
      "created_at": {
        "type": "string",
        "format": "date-time"
      },
      "expires_at": {
        "type": "string",
        "format": "date-time",
        "nullable": true
      },
      "external_subject": {
        "type": "string"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "name": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "owner_user_id": {
        "type": "string",
        "format": "uuid"
      },
      "provider": {
        "type": "string"
      },
      "revision": {
        "type": "integer",
        "format": "int64"
      },
      "scopes": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "status": {
        "type": "string"
      },
      "updated_at": {
        "type": "string",
        "format": "date-time"
      }
    }
  },
  "ConnectionProbeEvidence": {
    "type": "object",
    "required": [
      "probe",
      "result",
      "canonical_origin",
      "connection_revision",
      "tested_at",
      "expires_at"
    ],
    "properties": {
      "canonical_origin": {
        "type": "string"
      },
      "connection_revision": {
        "type": "string",
        "format": "date-time"
      },
      "expires_at": {
        "type": "string",
        "format": "date-time"
      },
      "probe": {
        "type": "string"
      },
      "result": {
        "type": "string"
      },
      "tested_at": {
        "type": "string",
        "format": "date-time"
      }
    }
  },
  "ConnectionResponse": {
    "type": "object",
    "required": [
      "connection"
    ],
    "properties": {
      "connection": {
        "$ref": "#/components/schemas/ConnectionInfo"
      }
    }
  },
  "ConnectionsResponse": {
    "type": "object",
    "required": [
      "connections"
    ],
    "properties": {
      "connections": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/ConnectionInfo"
        }
      }
    }
  },
  "ControlPlaneResponse": {
    "type": "object",
    "description": "Empty-success envelope used by control-plane mutations, never a failure body.",
    "required": [
      "success"
    ],
    "properties": {
      "data": {
        "nullable": true
      },
      "success": {
        "type": "boolean"
      }
    }
  },
  "Conversation": {
    "type": "object",
    "description": "Full conversation row from `agent_factory.conversations`.",
    "required": [
      "id",
      "user_id",
      "is_archived",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "chat_product_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "created_at": {
        "type": "string"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "is_archived": {
        "type": "boolean"
      },
      "title": {
        "type": "string",
        "nullable": true
      },
      "updated_at": {
        "type": "string"
      },
      "user_id": {
        "type": "string",
        "format": "uuid"
      }
    }
  },
  "ConversationMessage": {
    "type": "object",
    "description": "Full message row from `agent_factory.conversation_messages`.",
    "required": [
      "id",
      "conversation_id",
      "role",
      "content",
      "created_at"
    ],
    "properties": {
      "content": {
        "type": "string"
      },
      "conversation_id": {
        "type": "string",
        "format": "uuid"
      },
      "created_at": {
        "type": "string"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "metadata": {
        "nullable": true
      },
      "role": {
        "type": "string"
      }
    }
  },
  "ConversationSummary": {
    "type": "object",
    "description": "Summary of a conversation for listing (without full message history).",
    "required": [
      "conversation_id",
      "user_id",
      "message_count"
    ],
    "properties": {
      "conversation_id": {
        "type": "string",
        "format": "uuid"
      },
      "first_message_at": {
        "type": "string",
        "nullable": true
      },
      "last_message_at": {
        "type": "string",
        "nullable": true
      },
      "last_user_message": {
        "type": "string",
        "nullable": true
      },
      "message_count": {
        "type": "integer",
        "format": "int64"
      },
      "user_id": {
        "type": "string",
        "format": "uuid"
      }
    }
  },
  "ConversationSummaryPageRow": {
    "allOf": [
      {
        "$ref": "#/components/schemas/ConversationSummary"
      },
      {
        "type": "object",
        "required": [
          "updated_at"
        ],
        "properties": {
          "updated_at": {
            "type": "string"
          }
        }
      }
    ],
    "description": "Public keyset projection; the ordering timestamp belongs to the parent row."
  },
  "CreatePlatformApiKeyRequest": {
    "type": "object",
    "description": "Request body for creating a new platform API key.",
    "required": [
      "service_account_id",
      "scopes"
    ],
    "properties": {
      "allowed_origins": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "nullable": true
      },
      "expires_at": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "scopes": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "service_account_id": {
        "type": "string",
        "format": "uuid"
      }
    },
    "additionalProperties": false
  },
  "CreatePlatformApiKeyResponse": {
    "type": "object",
    "description": "Response for creating a new platform API key — includes the plaintext key (shown once).",
    "required": [
      "key",
      "info"
    ],
    "properties": {
      "info": {
        "$ref": "#/components/schemas/PlatformApiKeyInfo"
      },
      "key": {
        "type": "string"
      }
    }
  },
  "PlatformApiKeyInfo": {
    "type": "object",
    "description": "Public-facing info DTO for a platform API key (no hash).",
    "required": [
      "id",
      "organization_id",
      "name",
      "key_prefix",
      "owner_type",
      "is_active",
      "created_at"
    ],
    "properties": {
      "allowed_origins": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "nullable": true
      },
      "created_at": {
        "type": "string"
      },
      "expires_at": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "is_active": {
        "type": "boolean"
      },
      "key_prefix": {
        "type": "string"
      },
      "last_used_at": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "owner_service_account_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "owner_type": {
        "type": "string"
      },
      "owner_user_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "scopes": {
        "nullable": true
      }
    }
  },
  "CreatePolicyRequest": {
    "type": "object",
    "description": "Request body for creating a new policy.",
    "required": [
      "name",
      "kind",
      "trigger",
      "condition",
      "effects"
    ],
    "properties": {
      "condition": {},
      "description": {
        "type": "string",
        "nullable": true
      },
      "effects": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/PolicyEffect"
        },
        "maxItems": 64
      },
      "kind": {
        "type": "string"
      },
      "metadata": {
        "allOf": [
          {
            "$ref": "#/components/schemas/PolicyMetadata"
          }
        ],
        "nullable": true
      },
      "name": {
        "type": "string"
      },
      "phase": {
        "allOf": [
          {
            "type": "string",
            "description": "String values accepted by this HTTP/DB boundary. The shared `PolicyPhase`\nIR also has a data-carrying custom variant whose JSON shape is not a string,\nso it must not be used to describe these string-backed DTO fields.",
            "enum": [
              "default",
              "cost",
              "security",
              "business"
            ]
          }
        ],
        "default": "default"
      },
      "priority": {
        "type": "integer",
        "format": "int32"
      },
      "scope": {
        "type": "string",
        "description": "Scope is derived from the workflow binding (WSP-002). An omitted scope\nis derived server-side; an explicit scope that contradicts the binding\nis rejected.",
        "nullable": true
      },
      "trigger": {
        "type": "string"
      },
      "workflow_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    }
  },
  "PolicyEffect": {
    "oneOf": [
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "required": [
              "message"
            ],
            "properties": {
              "message": {
                "type": "string"
              }
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "block"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "type"
        ],
        "properties": {
          "type": {
            "type": "string",
            "enum": [
              "allow"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "description": "Reserved legacy shape. New policy authoring rejects generic input mutation;\nuse `modify_step_config` for bounded, path-validated runtime changes.",
            "required": [
              "path",
              "value"
            ],
            "properties": {
              "path": {
                "type": "string"
              },
              "value": {}
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "modify"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "required": [
              "path",
              "value"
            ],
            "properties": {
              "path": {
                "type": "string"
              },
              "value": {}
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "modify_step_config"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "required": [
              "message",
              "severity"
            ],
            "properties": {
              "message": {
                "type": "string"
              },
              "severity": {
                "type": "string"
              }
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "audit"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "required": [
              "channel",
              "message"
            ],
            "properties": {
              "channel": {
                "type": "string"
              },
              "message": {
                "type": "string"
              }
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "notify"
            ]
          }
        }
      },
      {
        "type": "object",
        "required": [
          "type",
          "data"
        ],
        "properties": {
          "data": {
            "type": "object",
            "required": [
              "rate_limit",
              "window_seconds"
            ],
            "properties": {
              "rate_limit": {
                "type": "integer",
                "format": "int32",
                "maximum": 1000000,
                "minimum": 1
              },
              "window_seconds": {
                "type": "integer",
                "format": "int32",
                "maximum": 86400,
                "minimum": 1
              }
            }
          },
          "type": {
            "type": "string",
            "enum": [
              "throttle"
            ]
          }
        }
      }
    ],
    "discriminator": {
      "propertyName": "type"
    }
  },
  "CreateRuleRequest": {
    "type": "object",
    "description": "Request body for creating a rule. New rules start in `draft`.",
    "required": [
      "name",
      "enforcement",
      "targets",
      "condition",
      "reason_code"
    ],
    "properties": {
      "applicability": {
        "type": "string",
        "description": "`organization` (default) or `assignment`.",
        "nullable": true
      },
      "condition": {
        "description": "FilterExpr over the bounded guarded-event context."
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "enforcement": {
        "type": "string",
        "description": "`observe`, `guide`, `require_revision`, or `block`."
      },
      "guidance": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string"
      },
      "reason_code": {
        "type": "string"
      },
      "targets": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Step kinds the rule can evaluate, e.g. `gate`."
      }
    }
  },
  "CreateRulesetRequest": {
    "type": "object",
    "description": "Request body for creating a new ruleset.",
    "required": [
      "name",
      "kind",
      "scope",
      "trigger",
      "condition",
      "effects"
    ],
    "properties": {
      "condition": {},
      "description": {
        "type": "string",
        "nullable": true
      },
      "effects": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/RulesetEffect"
        },
        "maxItems": 64
      },
      "kind": {
        "type": "string"
      },
      "metadata": {
        "allOf": [
          {
            "$ref": "#/components/schemas/PolicyMetadata"
          }
        ],
        "nullable": true
      },
      "name": {
        "type": "string"
      },
      "phase": {
        "allOf": [
          {
            "type": "string",
            "description": "String values accepted by this HTTP/DB boundary. The shared `PolicyPhase`\nIR also has a data-carrying custom variant whose JSON shape is not a string,\nso it must not be used to describe these string-backed DTO fields.",
            "enum": [
              "default",
              "cost",
              "security",
              "business"
            ]
          }
        ],
        "default": "default"
      },
      "priority": {
        "type": "integer",
        "format": "int32"
      },
      "scope": {
        "type": "string"
      },
      "trigger": {
        "type": "string"
      }
    }
  },
  "CreateServiceAccountRequest": {
    "type": "object",
    "description": "Request to create a new service account.",
    "required": [
      "name",
      "role_name"
    ],
    "properties": {
      "description": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string"
      },
      "role_name": {
        "type": "string"
      }
    }
  },
  "CreateSystemRequest": {
    "type": "object",
    "description": "Request body for creating a new system.",
    "required": [
      "name"
    ],
    "properties": {
      "auth_config_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "database_config_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "is_default": {
        "type": "boolean",
        "nullable": true
      },
      "name": {
        "type": "string"
      },
      "provider_connection_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "slug": {
        "type": "string",
        "nullable": true
      },
      "storage_config_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    }
  },
  "CredentialInfo": {
    "type": "object",
    "description": "Credential info (without the actual key).",
    "required": [
      "id",
      "provider_name",
      "is_active"
    ],
    "properties": {
      "base_url": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "is_active": {
        "type": "boolean"
      },
      "label": {
        "type": "string",
        "nullable": true
      },
      "last_used_at": {
        "type": "string",
        "nullable": true
      },
      "provider_name": {
        "type": "string"
      }
    }
  },
  "CredentialResponse": {
    "type": "object",
    "description": "Response for credential operations.",
    "required": [
      "success"
    ],
    "properties": {
      "provider_name": {
        "type": "string",
        "nullable": true
      },
      "success": {
        "type": "boolean"
      }
    }
  },
  "DashboardRunAggregateBucket": {
    "type": "string",
    "description": "Bucket granularity for selected-range dashboard run aggregates.",
    "enum": [
      "hour",
      "day"
    ]
  },
  "DashboardRunAggregateRange": {
    "type": "object",
    "description": "Normalized time range metadata for dashboard run aggregates.",
    "required": [
      "start_at",
      "end_at",
      "timezone",
      "bucket"
    ],
    "properties": {
      "bucket": {
        "$ref": "#/components/schemas/DashboardRunAggregateBucket"
      },
      "end_at": {
        "type": "string",
        "format": "date-time"
      },
      "start_at": {
        "type": "string",
        "format": "date-time"
      },
      "timezone": {
        "type": "string"
      }
    }
  },
  "DashboardRunAggregateTotals": {
    "type": "object",
    "description": "Status totals for dashboard run aggregates.",
    "required": [
      "total_runs",
      "completed",
      "failed",
      "waiting",
      "cancelled",
      "other"
    ],
    "properties": {
      "cancelled": {
        "type": "integer",
        "format": "int64"
      },
      "completed": {
        "type": "integer",
        "format": "int64"
      },
      "failed": {
        "type": "integer",
        "format": "int64"
      },
      "failure_rate": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "other": {
        "type": "integer",
        "format": "int64"
      },
      "success_rate": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "total_runs": {
        "type": "integer",
        "format": "int64"
      },
      "waiting": {
        "type": "integer",
        "format": "int64"
      }
    }
  },
  "DashboardRunAggregates": {
    "type": "object",
    "description": "Selected-range dashboard run aggregate response.",
    "required": [
      "range",
      "totals",
      "duration",
      "trend"
    ],
    "properties": {
      "duration": {
        "$ref": "#/components/schemas/DashboardRunDurationMetrics"
      },
      "range": {
        "$ref": "#/components/schemas/DashboardRunAggregateRange"
      },
      "totals": {
        "$ref": "#/components/schemas/DashboardRunAggregateTotals"
      },
      "trend": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/DashboardRunTrendBucket"
        }
      }
    }
  },
  "DashboardRunDurationMetrics": {
    "type": "object",
    "description": "Duration metrics for dashboard run aggregates.",
    "required": [
      "semantic",
      "measurement_quality",
      "sample_count"
    ],
    "properties": {
      "avg_duration_ms": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "max_duration_ms": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "measurement_quality": {
        "type": "string"
      },
      "min_duration_ms": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "p50_duration_ms": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "p95_duration_ms": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "p99_duration_ms": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "sample_count": {
        "type": "integer",
        "format": "int64"
      },
      "semantic": {
        "type": "string"
      }
    }
  },
  "DashboardRunTrendBucket": {
    "type": "object",
    "description": "One trend bucket for selected-range dashboard run aggregates.",
    "required": [
      "bucket_start_at",
      "bucket_end_at",
      "totals",
      "duration"
    ],
    "properties": {
      "bucket_end_at": {
        "type": "string",
        "format": "date-time"
      },
      "bucket_start_at": {
        "type": "string",
        "format": "date-time"
      },
      "duration": {
        "$ref": "#/components/schemas/DashboardRunDurationMetrics"
      },
      "totals": {
        "$ref": "#/components/schemas/DashboardRunAggregateTotals"
      }
    }
  },
  "DecisionTraceMode": {
    "type": "string",
    "description": "Detail retained for policy and business-rule decision traces.",
    "enum": [
      "summary",
      "fired_only",
      "full_debug"
    ]
  },
  "DeclareInferenceDevice": {
    "type": "object",
    "description": "Owner-supplied expectations for future device verification.",
    "required": [
      "display_name",
      "identity_spki_sha256",
      "expected_models"
    ],
    "properties": {
      "display_name": {
        "type": "string"
      },
      "expected_models": {
        "type": "object",
        "description": "Logical model ID to expected artifact SHA-256. An empty map permits device-only staging.",
        "additionalProperties": {
          "type": "string"
        }
      },
      "identity_spki_sha256": {
        "type": "string",
        "description": "Lowercase SHA-256 of the independently obtained DER SubjectPublicKeyInfo."
      }
    },
    "additionalProperties": false
  },
  "DeleteDocumentsRequest": {
    "type": "object",
    "description": "DELETE /api/knowledge/sources/{source_id}/documents\n\nAtomically delete documents except explicit retained IDs, preserving their counters.",
    "required": [
      "keep_ids"
    ],
    "properties": {
      "keep_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        }
      }
    },
    "additionalProperties": false
  },
  "DeleteDocumentsResponse": {
    "type": "object",
    "required": [
      "deleted",
      "message"
    ],
    "properties": {
      "deleted": {
        "type": "integer",
        "format": "int64",
        "minimum": 0
      },
      "message": {
        "type": "string"
      }
    }
  },
  "DeleteResponse": {
    "type": "object",
    "description": "Generic success message (used for delete responses).",
    "required": [
      "message"
    ],
    "properties": {
      "message": {
        "type": "string"
      }
    }
  },
  "DeployVersionRequest": {
    "type": "object",
    "description": "Request body for deploying a package version.",
    "required": [
      "name",
      "version",
      "environment_slug"
    ],
    "properties": {
      "environment_slug": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "package_hash": {
        "type": "string",
        "nullable": true
      },
      "version": {
        "type": "string"
      }
    }
  },
  "Deployment": {
    "type": "object",
    "description": "Audit-ready link between an immutable package version and an environment.",
    "required": [
      "id",
      "environment_id",
      "system_id",
      "workflow_package_version_id",
      "status",
      "validation_snapshot",
      "runtime_target",
      "created_at"
    ],
    "properties": {
      "actor_user_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "created_at": {
        "type": "string"
      },
      "environment_id": {
        "type": "string",
        "format": "uuid"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid",
        "description": "Tenant organization ID. `None` is reserved for operator-managed platform data.",
        "nullable": true
      },
      "runtime_target": {
        "$ref": "#/components/schemas/RuntimeTarget"
      },
      "status": {
        "$ref": "#/components/schemas/DeploymentStatus"
      },
      "system_id": {
        "type": "string",
        "format": "uuid",
        "description": "Server-resolved System that supplies the runtime infrastructure context."
      },
      "validation_snapshot": {
        "type": "object",
        "description": "Server-authoritative validation and compatibility result at deployment time."
      },
      "workflow_package_version_id": {
        "type": "string",
        "format": "uuid"
      }
    }
  },
  "RuntimeTarget": {
    "type": "string",
    "description": "Runtime target hint for a governed workflow package.",
    "enum": [
      "managed_cloud",
      "self_hosted",
      "edge_local"
    ]
  },
  "DeploymentStatus": {
    "type": "string",
    "description": "Persisted deployment lifecycle state.",
    "enum": [
      "pending",
      "succeeded",
      "failed"
    ]
  },
  "DeploymentResponse": {
    "type": "object",
    "description": "Response body for a successful deployment.",
    "required": [
      "deployment_id",
      "package_name",
      "package_version",
      "environment_id",
      "environment_name",
      "status",
      "created_at"
    ],
    "properties": {
      "created_at": {
        "type": "string"
      },
      "deployment_id": {
        "type": "string",
        "format": "uuid"
      },
      "environment_id": {
        "type": "string",
        "format": "uuid"
      },
      "environment_name": {
        "type": "string"
      },
      "package_name": {
        "type": "string"
      },
      "package_version": {
        "type": "string"
      },
      "status": {
        "type": "string"
      }
    }
  },
  "DeploymentSummaryResponse": {
    "type": "object",
    "description": "A deployment summary embedded in version responses.",
    "required": [
      "id",
      "package_name",
      "package_version",
      "status",
      "environment_id",
      "created_at"
    ],
    "properties": {
      "created_at": {
        "type": "string"
      },
      "environment_id": {
        "type": "string",
        "format": "uuid"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "package_name": {
        "type": "string"
      },
      "package_version": {
        "type": "string"
      },
      "status": {
        "type": "string"
      }
    }
  },
  "DisconnectInfo": {
    "type": "object",
    "required": [
      "connection",
      "remote_revocation"
    ],
    "properties": {
      "connection": {
        "$ref": "#/components/schemas/ConnectionInfo"
      },
      "remote_revocation": {
        "$ref": "#/components/schemas/RevocationStatus"
      }
    }
  },
  "RevocationStatus": {
    "type": "string",
    "enum": [
      "confirmed",
      "unsupported",
      "unconfirmed"
    ]
  },
  "EffectiveLimits": {
    "type": "object",
    "description": "Effective limits for an org (resolved from plan defaults + overrides).\nComes from the `organization_effective_limits` view.",
    "required": [
      "organization_id",
      "plan_name",
      "plan_display_name",
      "billing_interval",
      "subscription_status",
      "max_users",
      "max_agents",
      "max_workflows",
      "max_requests_per_day",
      "max_knowledge_sources",
      "max_triggers",
      "features",
      "price_monthly_usd",
      "price_annual_usd",
      "current_period_start"
    ],
    "properties": {
      "billing_interval": {
        "type": "string"
      },
      "current_period_end": {
        "type": "string",
        "format": "date-time",
        "nullable": true
      },
      "current_period_start": {
        "type": "string",
        "format": "date-time"
      },
      "features": {},
      "max_agents": {
        "type": "integer",
        "format": "int32"
      },
      "max_knowledge_sources": {
        "type": "integer",
        "format": "int32"
      },
      "max_requests_per_day": {
        "type": "integer",
        "format": "int32"
      },
      "max_triggers": {
        "type": "integer",
        "format": "int32"
      },
      "max_users": {
        "type": "integer",
        "format": "int32"
      },
      "max_workflows": {
        "type": "integer",
        "format": "int32"
      },
      "monthly_token_limit": {
        "type": "integer",
        "format": "int64",
        "nullable": true
      },
      "monthly_workflow_run_limit": {
        "type": "integer",
        "format": "int64",
        "nullable": true
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "plan_display_name": {
        "type": "string"
      },
      "plan_name": {
        "type": "string"
      },
      "price_annual_usd": {
        "type": "number",
        "format": "double"
      },
      "price_monthly_usd": {
        "type": "number",
        "format": "double"
      },
      "subscription_status": {
        "type": "string"
      },
      "trial_ends_at": {
        "type": "string",
        "format": "date-time",
        "nullable": true
      }
    }
  },
  "EmbeddingModelRow": {
    "type": "object",
    "description": "Embedding model row for knowledge source creation dropdowns.",
    "required": [
      "id",
      "name",
      "display_name",
      "provider_id",
      "embedding_dimensions",
      "is_active"
    ],
    "properties": {
      "display_name": {
        "type": "string"
      },
      "embedding_dimensions": {
        "type": "integer",
        "format": "int32"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "is_active": {
        "type": "boolean"
      },
      "name": {
        "type": "string"
      },
      "provider_id": {
        "type": "string",
        "format": "uuid"
      },
      "supported_dimensions": {
        "type": "string",
        "nullable": true
      }
    }
  },
  "Environment": {
    "type": "object",
    "description": "A row from `control_plane.environments` — a named, org-scoped deployment target.",
    "required": [
      "id",
      "name",
      "slug",
      "is_default",
      "is_active",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "active_deployment_id": {
        "type": "string",
        "format": "uuid",
        "description": "Successful deployment currently selected for this environment.",
        "nullable": true
      },
      "created_at": {
        "type": "string"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "is_active": {
        "type": "boolean"
      },
      "is_default": {
        "type": "boolean"
      },
      "name": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid",
        "description": "Tenant organization ID. `None` for platform-level environments.",
        "nullable": true
      },
      "settings": {},
      "slug": {
        "type": "string"
      },
      "updated_at": {
        "type": "string"
      }
    }
  },
  "EnvironmentInsert": {
    "type": "object",
    "description": "Insert payload for creating an environment.",
    "required": [
      "name",
      "slug"
    ],
    "properties": {
      "description": {
        "type": "string",
        "nullable": true
      },
      "is_active": {
        "type": "boolean"
      },
      "is_default": {
        "type": "boolean"
      },
      "name": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid",
        "description": "Tenant organization ID — set server-side from auth context.",
        "nullable": true
      },
      "settings": {
        "nullable": true
      },
      "slug": {
        "type": "string",
        "description": "Canonical lowercase ASCII identifier (1-128 bytes; single hyphen separators).",
        "maxLength": 128,
        "minLength": 1,
        "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$"
      }
    }
  },
  "GateCancelResponse": {
    "type": "object",
    "description": "Result of cancelling a gate.\n\n`cancelled` is the gate's terminal state, recorded with the same payload the\nexisting waiting-run cancellation writes: no resolving principal and no\nresponse, because no one answered the interaction.",
    "required": [
      "gate_id",
      "run_id",
      "status"
    ],
    "properties": {
      "gate_id": {
        "type": "string",
        "format": "uuid"
      },
      "run_id": {
        "type": "string",
        "format": "uuid"
      },
      "status": {
        "$ref": "#/components/schemas/InteractionState"
      }
    }
  },
  "InteractionState": {
    "type": "string",
    "description": "State of a persisted human interaction (a Gate record).",
    "enum": [
      "pending",
      "resolving",
      "resolved",
      "declined",
      "expired",
      "cancelled"
    ]
  },
  "GateResolveRequest": {
    "type": "object",
    "description": "Public gate-resolution payload. Authentication is supplied by headers.",
    "required": [
      "run_id",
      "response"
    ],
    "properties": {
      "attachments": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/Attachment"
        },
        "description": "At most five attachments returned to the original requesting frame.",
        "maxItems": 5,
        "nullable": true
      },
      "response": {
        "$ref": "#/components/schemas/JsonValue"
      },
      "resume": {
        "type": "boolean",
        "description": "Continue under original execution authority when available; otherwise record the answer and return resume_required.",
        "default": true
      },
      "run_id": {
        "type": "string",
        "format": "uuid",
        "description": "Recorded run that owns this interaction and its original System binding."
      },
      "stream": {
        "type": "boolean",
        "description": "Stream resumed workflow output as SSE. Defaults to false."
      },
      "system_id": {
        "type": "string",
        "format": "uuid",
        "description": "Optional assertion of the recorded System; an absent value discovers its binding.",
        "nullable": true
      }
    }
  },
  "GateResolveResponse": {
    "oneOf": [
      {
        "$ref": "#/components/schemas/WorkflowExecutionResponse"
      },
      {
        "$ref": "#/components/schemas/GateResolvedResponse"
      }
    ]
  },
  "WorkflowExecutionResponse": {
    "type": "object",
    "required": [
      "content",
      "trace"
    ],
    "properties": {
      "content": {
        "type": "string"
      },
      "trace": {
        "$ref": "#/components/schemas/WorkflowExecutionTrace"
      }
    }
  },
  "WorkflowExecutionTrace": {
    "type": "object",
    "required": [
      "run_id",
      "total_ms",
      "steps"
    ],
    "properties": {
      "db": {
        "allOf": [
          {
            "$ref": "#/components/schemas/JsonValue"
          }
        ],
        "nullable": true
      },
      "grounding": {
        "allOf": [
          {
            "$ref": "#/components/schemas/GroundingEvidence"
          }
        ],
        "nullable": true
      },
      "phases": {
        "allOf": [
          {
            "$ref": "#/components/schemas/JsonValue"
          }
        ],
        "nullable": true
      },
      "run_id": {
        "type": "string",
        "format": "uuid"
      },
      "setup": {
        "allOf": [
          {
            "$ref": "#/components/schemas/JsonValue"
          }
        ],
        "nullable": true
      },
      "steps": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/JsonValue"
        },
        "description": "Step-specific runtime diagnostics, separate from execution output."
      },
      "total_ms": {
        "type": "integer",
        "format": "int64",
        "minimum": 0
      }
    }
  },
  "GroundingEvidence": {
    "type": "object",
    "description": "Bounded grounding evidence for one reply.",
    "required": [
      "requirement",
      "verdict",
      "reason",
      "reply_sha256",
      "sources_retrieved",
      "latency_ms"
    ],
    "properties": {
      "citations": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/GroundingCitation"
        }
      },
      "latency_ms": {
        "type": "integer",
        "format": "int64",
        "minimum": 0
      },
      "reason": {
        "$ref": "#/components/schemas/GroundingReason"
      },
      "reply_sha256": {
        "type": "string",
        "description": "SHA-256 of the exact reply text, so the verdict cannot be transferred."
      },
      "requirement": {
        "$ref": "#/components/schemas/GroundingRequirement"
      },
      "sources_retrieved": {
        "type": "integer",
        "format": "int32",
        "minimum": 0
      },
      "verdict": {
        "$ref": "#/components/schemas/GroundingVerdict"
      }
    }
  },
  "GroundingCitation": {
    "type": "object",
    "description": "One resolved citation in a verified reply.\n\nDeliberately content-minimized: identifiers, the retrieval score, and the\nposition the model saw. Retrieved text stays in the retrieval record.",
    "required": [
      "source_index",
      "chunk_id",
      "document_id",
      "similarity"
    ],
    "properties": {
      "chunk_id": {
        "type": "string",
        "format": "uuid"
      },
      "document_id": {
        "type": "string",
        "format": "uuid"
      },
      "similarity": {
        "type": "number",
        "format": "float"
      },
      "source_index": {
        "type": "integer",
        "format": "int32",
        "description": "The `N` in the reply's `[source:N]` token.",
        "minimum": 0
      }
    }
  },
  "GroundingReason": {
    "type": "string",
    "description": "Why a verdict was reached. Stable, so evidence can be aggregated.",
    "enum": [
      "supported",
      "no_support",
      "unresolvable_citation",
      "verification_unavailable"
    ]
  },
  "GroundingVerdict": {
    "type": "string",
    "description": "Outcome of verifying one reply against the sources retrieved during its run.",
    "enum": [
      "grounded",
      "ungrounded",
      "not_checked"
    ]
  },
  "GateResolvedResponse": {
    "type": "object",
    "required": [
      "status",
      "gate_id",
      "run_id",
      "resume_required",
      "response"
    ],
    "properties": {
      "gate_id": {
        "type": "string",
        "format": "uuid"
      },
      "response": {
        "$ref": "#/components/schemas/JsonValue"
      },
      "resume_required": {
        "type": "boolean"
      },
      "run_id": {
        "type": "string",
        "format": "uuid"
      },
      "status": {
        "$ref": "#/components/schemas/GateResolvedStatus"
      }
    }
  },
  "GateResolvedStatus": {
    "type": "string",
    "enum": [
      "resolved",
      "declined"
    ]
  },
  "GovernedWorkflowPackage": {
    "type": "object",
    "description": "SDK/CLI-authored package that wraps the runtime workflow IR with governance\nmetadata. Backend runtime paths should unwrap `workflow` before execution.",
    "required": [
      "schema_version",
      "name",
      "version",
      "workflow"
    ],
    "properties": {
      "compatibility": {
        "$ref": "#/components/schemas/WorkflowCompatibility"
      },
      "description": {
        "type": "string",
        "description": "Optional package description.",
        "nullable": true
      },
      "display_name": {
        "type": "string",
        "description": "Optional display name for UI surfaces.",
        "nullable": true
      },
      "input_schema": {
        "type": "object",
        "description": "JSON Schema describing caller input."
      },
      "name": {
        "type": "string",
        "description": "Stable package name used by SDKs, CLI, and deployment records."
      },
      "output_schema": {
        "type": "object",
        "description": "JSON Schema describing package output."
      },
      "policy_refs": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Referenced policy names in `resources.policies` or tenant policy catalogs."
      },
      "resources": {
        "$ref": "#/components/schemas/WorkflowPackageResources"
      },
      "ruleset_refs": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Referenced ruleset names in `resources.rulesets` or tenant rule catalogs."
      },
      "runtime": {
        "$ref": "#/components/schemas/RuntimeTargetHints"
      },
      "schema_version": {
        "type": "string",
        "description": "Version of the governed package schema, independent of app or DB schema versions."
      },
      "version": {
        "type": "string",
        "description": "Author-controlled package version."
      },
      "workflow": {
        "$ref": "#/components/schemas/Workflow"
      }
    }
  },
  "WorkflowCompatibility": {
    "type": "object",
    "description": "Compatibility metadata carried with packages so SDKs, CLIs, and backend\nvalidators can make version decisions before deployment or execution.",
    "properties": {
      "compatible_schema_versions": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "deprecated_features": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "migration_hint": {
        "type": "string",
        "nullable": true
      },
      "min_runtime_version": {
        "type": "string",
        "nullable": true
      }
    }
  },
  "WorkflowPackageResources": {
    "type": "object",
    "description": "Logical resource maps keyed by package-local names such as `invoice-parser`.",
    "properties": {
      "agents": {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/LogicalResourceRef"
        }
      },
      "credentials": {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/LogicalResourceRef"
        }
      },
      "policies": {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/LogicalResourceRef"
        }
      },
      "rulesets": {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/LogicalResourceRef"
        }
      },
      "systems": {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/LogicalResourceRef"
        }
      },
      "tools": {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/components/schemas/LogicalResourceRef"
        }
      }
    }
  },
  "LogicalResourceRef": {
    "type": "object",
    "description": "A package-local resource reference that may be unresolved, selector-based,\nor already resolved to a concrete runtime id.",
    "properties": {
      "external_id": {
        "type": "string",
        "description": "Provider or external system identifier used during resolution.",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid",
        "description": "Concrete runtime/control-plane id after resolution.",
        "nullable": true
      },
      "metadata": {
        "type": "object",
        "description": "Optional selector metadata for provider-specific matching."
      },
      "name": {
        "type": "string",
        "description": "Human-readable target name used during resolution.",
        "nullable": true
      },
      "required": {
        "type": "boolean",
        "description": "Whether validation/deploy should fail if this resource cannot resolve."
      }
    }
  },
  "RuntimeTargetHints": {
    "type": "object",
    "description": "Non-authoritative execution target hints. Validation and deployment decide\nwhether a target is actually available for an organization/environment.",
    "properties": {
      "allowed_targets": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/RuntimeTarget"
        }
      },
      "preferred_target": {
        "allOf": [
          {
            "$ref": "#/components/schemas/RuntimeTarget"
          }
        ],
        "nullable": true
      },
      "requires_gpu": {
        "type": "boolean",
        "nullable": true
      },
      "requires_network": {
        "type": "boolean",
        "nullable": true
      }
    }
  },
  "GroundingSummaryResponse": {
    "type": "object",
    "required": [
      "total",
      "grounded",
      "ungrounded",
      "not_checked",
      "since",
      "until"
    ],
    "properties": {
      "environment_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "grounded": {
        "type": "integer",
        "format": "int64"
      },
      "grounded_rate": {
        "type": "number",
        "format": "double",
        "description": "`grounded / total`, or `null` when nothing was verified.",
        "nullable": true
      },
      "not_checked": {
        "type": "integer",
        "format": "int64"
      },
      "since": {
        "type": "string"
      },
      "total": {
        "type": "integer",
        "format": "int64"
      },
      "ungrounded": {
        "type": "integer",
        "format": "int64"
      },
      "until": {
        "type": "string"
      },
      "workflow_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    }
  },
  "Group": {
    "type": "object",
    "description": "Full group row from `agent_factory.groups`.",
    "required": [
      "id",
      "name",
      "source",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "created_at": {
        "type": "string"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "external_id": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "name": {
        "type": "string"
      },
      "source": {
        "type": "string"
      },
      "updated_at": {
        "type": "string"
      }
    }
  },
  "GroupMembership": {
    "type": "object",
    "description": "Full group membership row from `agent_factory.group_memberships`.",
    "required": [
      "id",
      "group_id",
      "user_id",
      "source",
      "created_at"
    ],
    "properties": {
      "created_at": {
        "type": "string"
      },
      "group_id": {
        "type": "string",
        "format": "uuid"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "source": {
        "type": "string"
      },
      "user_id": {
        "type": "string",
        "format": "uuid"
      }
    }
  },
  "GuardianApplicability": {
    "type": "string",
    "description": "How a rule becomes applicable.",
    "enum": [
      "organization",
      "assignment"
    ]
  },
  "GuardianDecision": {
    "type": "object",
    "description": "One rule's decision, safe to persist and show.",
    "required": [
      "rule_id",
      "rule_name",
      "rule_version",
      "verdict",
      "enforcement",
      "reason_code"
    ],
    "properties": {
      "enforcement": {
        "$ref": "#/components/schemas/GuardianEnforcement"
      },
      "guidance": {
        "type": "string",
        "nullable": true
      },
      "reason_code": {
        "type": "string"
      },
      "rule_id": {
        "type": "string",
        "format": "uuid"
      },
      "rule_name": {
        "type": "string"
      },
      "rule_version": {
        "type": "integer",
        "format": "int32"
      },
      "verdict": {
        "$ref": "#/components/schemas/GuardianVerdict"
      }
    }
  },
  "GuardianEnforcement": {
    "type": "string",
    "description": "Bounded enforcement modes, from `RUNTIME-RULE-LEDGER`.",
    "enum": [
      "observe",
      "guide",
      "require_revision",
      "block"
    ]
  },
  "GuardianVerdict": {
    "type": "string",
    "description": "Typed evaluation result.",
    "enum": [
      "pass",
      "violation",
      "uncertain"
    ]
  },
  "GuardianEventKind": {
    "type": "string",
    "description": "The boundary the hook protects.",
    "enum": [
      "proposed_question",
      "human_response"
    ]
  },
  "GuardianRule": {
    "type": "object",
    "description": "A resolved, versioned rule supplied to the runtime.",
    "required": [
      "id",
      "name",
      "version",
      "enforcement",
      "applicability",
      "targets",
      "condition",
      "reason_code"
    ],
    "properties": {
      "applicability": {
        "$ref": "#/components/schemas/GuardianApplicability"
      },
      "condition": {
        "$ref": "#/components/schemas/FilterExpr"
      },
      "enforcement": {
        "$ref": "#/components/schemas/GuardianEnforcement"
      },
      "guidance": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "name": {
        "type": "string"
      },
      "reason_code": {
        "type": "string"
      },
      "targets": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Step kinds the rule can evaluate, e.g. `gate`."
      },
      "version": {
        "type": "integer",
        "format": "int32",
        "description": "Incremented on every edit, so evidence names the exact evaluated version."
      }
    }
  },
  "InferenceDeviceDeclaration": {
    "type": "object",
    "description": "Private inventory. None of these fields are evidence of a live connection.",
    "required": [
      "id",
      "organization_id",
      "display_name",
      "identity_spki_sha256",
      "expected_models",
      "declared_at",
      "declared_by"
    ],
    "properties": {
      "declared_at": {
        "type": "string",
        "format": "date-time"
      },
      "declared_by": {
        "type": "string",
        "format": "uuid"
      },
      "display_name": {
        "type": "string"
      },
      "expected_models": {
        "type": "object",
        "additionalProperties": {
          "type": "string"
        }
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "identity_spki_sha256": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      }
    }
  },
  "InstructionFullRow": {
    "type": "object",
    "description": "Full reusable instruction row including content and timestamps.",
    "required": [
      "id",
      "name",
      "content",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "content": {
        "type": "string"
      },
      "created_at": {
        "type": "string"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "name": {
        "type": "string"
      },
      "updated_at": {
        "type": "string"
      }
    }
  },
  "InstructionGetRequest": {
    "type": "object",
    "description": "Request body for fetching reusable instruction content by UUID.",
    "required": [
      "prompt_id"
    ],
    "properties": {
      "prompt_id": {
        "type": "string",
        "format": "uuid"
      }
    }
  },
  "InstructionInsert": {
    "type": "object",
    "description": "Insert payload for creating a reusable instruction.",
    "required": [
      "name",
      "content"
    ],
    "properties": {
      "content": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid",
        "description": "Tenant organization ID — set server-side from auth context.",
        "nullable": true
      }
    }
  },
  "InstructionList": {
    "type": "object",
    "description": "Minimal info for listing reusable instructions.",
    "required": [
      "id",
      "name"
    ],
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "name": {
        "type": "string"
      }
    }
  },
  "InstructionListQuery": {
    "type": "object",
    "properties": {
      "cursor": {
        "type": "string",
        "description": "Opaque continuation from the preceding page.",
        "nullable": true
      },
      "limit": {
        "type": "integer",
        "format": "int32",
        "description": "Maximum number of instructions to return (default: 50).",
        "nullable": true,
        "minimum": 0
      },
      "q": {
        "type": "string",
        "description": "Optional search query to filter instructions by name.",
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "InstructionResponse": {
    "type": "object",
    "description": "Single reusable instruction wrapper.",
    "required": [
      "instruction"
    ],
    "properties": {
      "instruction": {
        "$ref": "#/components/schemas/InstructionFullRow"
      }
    }
  },
  "InstructionUpdate": {
    "type": "object",
    "description": "Partial update payload for reusable instructions (all fields optional).",
    "properties": {
      "content": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      }
    }
  },
  "InteractionHistory": {
    "allOf": [
      {
        "type": "object",
        "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
        "required": [
          "items"
        ],
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/InteractionHistoryEntry"
            }
          },
          "next_cursor": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "type": "object",
        "required": [
          "run_id",
          "run_status",
          "segment",
          "from_entry",
          "truncated"
        ],
        "properties": {
          "from_entry": {
            "type": "integer",
            "minimum": 0
          },
          "gate_id": {
            "type": "string",
            "format": "uuid",
            "nullable": true
          },
          "gate_status": {
            "allOf": [
              {
                "$ref": "#/components/schemas/InteractionState"
              }
            ],
            "nullable": true
          },
          "run_id": {
            "type": "string",
            "format": "uuid"
          },
          "run_status": {
            "$ref": "#/components/schemas/RunState"
          },
          "segment": {
            "$ref": "#/components/schemas/InteractionHistorySegment"
          },
          "truncated": {
            "type": "boolean",
            "description": "Visible content exceeded 64 KiB, or a requested tool name exceeded 256 bytes.\nUnloaded segments are available through the cursor, not discarded."
          }
        }
      }
    ],
    "description": "A projected segment can be empty while later segments remain. This is not\na claim that the complete transcript or the run itself has finished."
  },
  "InteractionHistoryEntry": {
    "type": "object",
    "required": [
      "role",
      "content"
    ],
    "properties": {
      "content": {
        "type": "string",
        "description": "At most 64 KiB of UTF-8; shortening is reported by the segment.",
        "maxLength": 65536
      },
      "role": {
        "$ref": "#/components/schemas/InteractionHistoryRole"
      },
      "tool_name": {
        "type": "string",
        "nullable": true,
        "maxLength": 256
      }
    }
  },
  "InteractionHistoryRole": {
    "type": "string",
    "enum": [
      "assistant",
      "user",
      "tool"
    ]
  },
  "InteractionHistorySegment": {
    "type": "string",
    "enum": [
      "initial",
      "gate",
      "final"
    ]
  },
  "InteractionRequiredEvent": {
    "type": "object",
    "description": "Typed `interaction_required` stream event.\n\nDocumentation-only schema: the runtime builds the event with\n`StreamEvent::InteractionRequired`, and a contract test asserts the emitted\nkeys match these properties.",
    "required": [
      "type",
      "interaction_id",
      "run_id",
      "response_type",
      "question"
    ],
    "properties": {
      "choices": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Allowed answers for `single_select`.",
        "nullable": true
      },
      "context": {
        "description": "Safe display context; never credentials or hidden prompts.",
        "nullable": true
      },
      "expires_at": {
        "type": "string",
        "description": "Deadline after which the configured timeout action applies.",
        "nullable": true
      },
      "guardian_guidance": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "description": "Display guidance from matching Guardian `guide` rules."
      },
      "interaction_id": {
        "type": "string",
        "format": "uuid",
        "description": "Persisted interaction that resolves this request."
      },
      "question": {
        "type": "string",
        "description": "The question to show the user."
      },
      "response_type": {
        "$ref": "#/components/schemas/InteractionResponseType"
      },
      "run_id": {
        "type": "string",
        "format": "uuid"
      },
      "timeout_action": {
        "type": "string",
        "description": "The action applied at the deadline: `approve`, `reject`, or `skip`.",
        "nullable": true
      },
      "type": {
        "type": "string",
        "description": "Always `interaction_required`.",
        "example": "interaction_required"
      }
    }
  },
  "InteractionResponseType": {
    "type": "string",
    "description": "Response shape the client must collect for a pending interaction.",
    "enum": [
      "text",
      "confirmation",
      "single_select"
    ]
  },
  "KnowledgeBase": {
    "type": "object",
    "description": "Full knowledge base row from `agent_factory.knowledge_bases`.",
    "required": [
      "id",
      "name",
      "access_level",
      "chunking_strategy",
      "chunking_config",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "access_level": {
        "type": "string"
      },
      "chunking_config": {},
      "chunking_strategy": {
        "type": "string"
      },
      "created_at": {
        "type": "string"
      },
      "created_by": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "metadata": {
        "nullable": true
      },
      "name": {
        "type": "string"
      },
      "updated_at": {
        "type": "string"
      }
    }
  },
  "KnowledgeBaseAccessRule": {
    "type": "object",
    "description": "Full access rule row from `agent_factory.knowledge_base_access`.",
    "required": [
      "id",
      "knowledge_base_id",
      "group_id",
      "permission",
      "created_at"
    ],
    "properties": {
      "created_at": {
        "type": "string"
      },
      "group_id": {
        "type": "string",
        "format": "uuid"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "knowledge_base_id": {
        "type": "string",
        "format": "uuid"
      },
      "permission": {
        "type": "string"
      }
    }
  },
  "KnowledgeBaseAccessRuleInput": {
    "type": "object",
    "description": "Individual access rule input (group_id + permission).",
    "required": [
      "group_id"
    ],
    "properties": {
      "group_id": {
        "type": "string",
        "format": "uuid"
      },
      "permission": {
        "type": "string",
        "nullable": true
      }
    }
  },
  "KnowledgeBaseAccessUpdateResponse": {
    "type": "object",
    "description": "Request body for PUT /api/knowledge-bases/{id}/access.",
    "required": [
      "access_rules"
    ],
    "properties": {
      "access_rules": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/KnowledgeBaseAccessRule"
        }
      }
    }
  },
  "KnowledgeChunkSample": {
    "type": "object",
    "description": "Lightweight chunk row for sampling (no embedding vector).",
    "required": [
      "id",
      "document_id",
      "content",
      "chunk_index"
    ],
    "properties": {
      "chunk_index": {
        "type": "integer",
        "format": "int32"
      },
      "chunk_metadata": {},
      "content": {
        "type": "string"
      },
      "document_id": {
        "type": "string",
        "format": "uuid"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "token_count": {
        "type": "integer",
        "format": "int32"
      }
    }
  },
  "KnowledgeDocumentListRow": {
    "type": "object",
    "description": "Lightweight list row for knowledge documents.",
    "required": [
      "id",
      "source_id",
      "name",
      "source_type",
      "chunk_count",
      "token_count",
      "status",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "chunk_count": {
        "type": "integer",
        "format": "int32"
      },
      "created_at": {
        "type": "string"
      },
      "error": {
        "type": "string",
        "nullable": true
      },
      "format": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "name": {
        "type": "string"
      },
      "source_id": {
        "type": "string",
        "format": "uuid"
      },
      "source_type": {
        "type": "string"
      },
      "status": {
        "type": "string"
      },
      "token_count": {
        "type": "integer",
        "format": "int32"
      },
      "updated_at": {
        "type": "string"
      }
    }
  },
  "KnowledgeDocumentPreview": {
    "type": "object",
    "required": [
      "document_id",
      "source_id",
      "version_id",
      "name",
      "mime_type",
      "content_hash",
      "text",
      "passages",
      "original_available"
    ],
    "properties": {
      "content_hash": {
        "type": "string"
      },
      "document_id": {
        "type": "string",
        "format": "uuid"
      },
      "mime_type": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "original_available": {
        "type": "boolean"
      },
      "passages": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/KnowledgeEvidencePassage"
        }
      },
      "source_id": {
        "type": "string",
        "format": "uuid"
      },
      "text": {
        "type": "string"
      },
      "unavailable_reason": {
        "type": "string",
        "nullable": true
      },
      "version_id": {
        "type": "string",
        "format": "uuid"
      }
    }
  },
  "KnowledgeEvidencePassage": {
    "type": "object",
    "required": [
      "id",
      "start",
      "end",
      "rects"
    ],
    "properties": {
      "end": {
        "type": "integer",
        "format": "int32",
        "description": "Exclusive UTF-8 byte offset.",
        "minimum": 0
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "page_label": {
        "type": "string",
        "nullable": true
      },
      "page_number": {
        "type": "integer",
        "format": "int32",
        "nullable": true,
        "minimum": 0
      },
      "rects": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/KnowledgeEvidenceRect"
        }
      },
      "start": {
        "type": "integer",
        "format": "int32",
        "description": "UTF-8 byte offset into the immutable canonical text.",
        "minimum": 0
      }
    }
  },
  "KnowledgeEvidenceRect": {
    "type": "object",
    "required": [
      "x",
      "y",
      "width",
      "height"
    ],
    "properties": {
      "height": {
        "type": "number",
        "format": "float"
      },
      "width": {
        "type": "number",
        "format": "float"
      },
      "x": {
        "type": "number",
        "format": "float"
      },
      "y": {
        "type": "number",
        "format": "float"
      }
    }
  },
  "KnowledgeEvalResult": {
    "type": "object",
    "description": "A row from `agent_factory.knowledge_eval_results`.",
    "required": [
      "id",
      "eval_run_id",
      "test_query_id",
      "query",
      "results_count",
      "hit",
      "created_at"
    ],
    "properties": {
      "created_at": {
        "type": "string"
      },
      "error": {
        "type": "string",
        "nullable": true
      },
      "eval_run_id": {
        "type": "string",
        "format": "uuid"
      },
      "found_chunk_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        }
      },
      "found_document_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        }
      },
      "hit": {
        "type": "boolean"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "latency_ms": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "mrr": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "ndcg_at_k": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "precision_at_k": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "query": {
        "type": "string"
      },
      "recall_at_k": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "results": {
        "description": "Full results snapshot — omitted from list queries to reduce payload."
      },
      "results_count": {
        "type": "integer",
        "format": "int32"
      },
      "test_query_id": {
        "type": "string",
        "format": "uuid"
      },
      "top_similarity": {
        "type": "number",
        "format": "double",
        "nullable": true
      }
    }
  },
  "KnowledgeEvalRun": {
    "type": "object",
    "description": "A row from `agent_factory.knowledge_eval_runs`.",
    "required": [
      "id",
      "source_id",
      "status",
      "search_mode",
      "top_k",
      "threshold",
      "rerank",
      "total_queries",
      "queries_run",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "created_at": {
        "type": "string"
      },
      "error": {
        "type": "string",
        "nullable": true
      },
      "hit_rate": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "mean_latency_ms": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "mean_mrr": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "mean_ndcg": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "mean_precision": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "mean_recall": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "mean_similarity": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "metadata": {
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "organization_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "queries_run": {
        "type": "integer",
        "format": "int32"
      },
      "query_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        }
      },
      "rerank": {
        "type": "boolean"
      },
      "rerank_model": {
        "type": "string",
        "nullable": true
      },
      "search_mode": {
        "type": "string"
      },
      "source_id": {
        "type": "string",
        "format": "uuid"
      },
      "status": {
        "type": "string"
      },
      "threshold": {
        "type": "number",
        "format": "double"
      },
      "top_k": {
        "type": "integer",
        "format": "int32"
      },
      "total_queries": {
        "type": "integer",
        "format": "int32"
      },
      "updated_at": {
        "type": "string"
      },
      "vector_weight": {
        "type": "number",
        "format": "double",
        "nullable": true
      }
    }
  },
  "KnowledgeSearchLog": {
    "type": "object",
    "description": "A row from agent_factory.knowledge_search_logs.",
    "required": [
      "id",
      "source_ids",
      "query",
      "search_mode",
      "top_k",
      "reranked",
      "results_count",
      "embedding_model",
      "origin",
      "created_at"
    ],
    "properties": {
      "created_at": {
        "type": "string"
      },
      "embedding_model": {
        "type": "string"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "latency_ms": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "origin": {
        "type": "string"
      },
      "origin_ref": {
        "nullable": true
      },
      "query": {
        "type": "string"
      },
      "rerank_model": {
        "type": "string",
        "nullable": true
      },
      "reranked": {
        "type": "boolean"
      },
      "results": {
        "description": "Full results snapshot — omitted from list queries to reduce payload."
      },
      "results_count": {
        "type": "integer",
        "format": "int32"
      },
      "search_mode": {
        "type": "string"
      },
      "source_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        }
      },
      "threshold": {
        "type": "number",
        "format": "float",
        "nullable": true
      },
      "top_k": {
        "type": "integer",
        "format": "int32"
      },
      "top_similarity": {
        "type": "number",
        "format": "float",
        "nullable": true
      },
      "user_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "vector_weight": {
        "type": "number",
        "format": "float",
        "nullable": true
      }
    }
  },
  "KnowledgeSourceListRow": {
    "type": "object",
    "description": "Lightweight list row for knowledge sources (same fields — sources are small).",
    "required": [
      "id",
      "name",
      "embedding_model",
      "embedding_provider",
      "embedding_dimensions",
      "document_count",
      "chunk_count",
      "total_tokens",
      "status",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "boundary_config": {},
      "boundary_type": {
        "type": "string"
      },
      "chunk_count": {
        "type": "integer",
        "format": "int32"
      },
      "created_at": {
        "type": "string"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "document_count": {
        "type": "integer",
        "format": "int32"
      },
      "embedding_dimensions": {
        "type": "integer",
        "format": "int32"
      },
      "embedding_model": {
        "type": "string"
      },
      "embedding_provider": {
        "type": "string"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "knowledge_base_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "metadata": {
        "nullable": true
      },
      "name": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "status": {
        "type": "string"
      },
      "total_tokens": {
        "type": "integer",
        "format": "int32"
      },
      "updated_at": {
        "type": "string"
      }
    }
  },
  "KnowledgeTag": {
    "type": "object",
    "description": "Full row from `agent_factory.knowledge_tags`.",
    "required": [
      "id",
      "source_id",
      "tag",
      "usage_count",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "created_at": {
        "type": "string"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "source_id": {
        "type": "string",
        "format": "uuid"
      },
      "tag": {
        "type": "string"
      },
      "updated_at": {
        "type": "string"
      },
      "usage_count": {
        "type": "integer",
        "format": "int32"
      }
    }
  },
  "KnowledgeTestQuery": {
    "type": "object",
    "description": "A row from agent_factory.knowledge_test_queries.",
    "required": [
      "id",
      "source_id",
      "query",
      "difficulty",
      "is_active",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "created_at": {
        "type": "string"
      },
      "difficulty": {
        "type": "string"
      },
      "expected_answer": {
        "type": "string",
        "nullable": true
      },
      "expected_chunk_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        }
      },
      "expected_document_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        }
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "is_active": {
        "type": "boolean"
      },
      "metadata": {},
      "name": {
        "type": "string",
        "nullable": true
      },
      "query": {
        "type": "string"
      },
      "source_id": {
        "type": "string",
        "format": "uuid"
      },
      "tags": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "updated_at": {
        "type": "string"
      }
    }
  },
  "KnowledgeTotals": {
    "type": "object",
    "description": "Whole authorized source scope, never totals inferred from an individual collection page.",
    "required": [
      "total_sources",
      "total_documents",
      "total_chunks",
      "total_tokens"
    ],
    "properties": {
      "total_chunks": {
        "type": "integer",
        "format": "int64"
      },
      "total_documents": {
        "type": "integer",
        "format": "int64"
      },
      "total_sources": {
        "type": "integer",
        "format": "int64"
      },
      "total_tokens": {
        "type": "integer",
        "format": "int64"
      }
    }
  },
  "MailMessage": {
    "type": "object",
    "required": [
      "id",
      "subject",
      "to"
    ],
    "properties": {
      "body_text": {
        "type": "string",
        "nullable": true
      },
      "conversation_id": {
        "type": "string",
        "nullable": true
      },
      "from": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string"
      },
      "preview": {
        "type": "string",
        "nullable": true
      },
      "received_at": {
        "type": "string",
        "nullable": true
      },
      "subject": {
        "type": "string"
      },
      "to": {
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    }
  },
  "MaskedCredentialResponse": {
    "type": "object",
    "description": "Masked credential metadata returned by the provider lookup endpoint.",
    "required": [
      "success",
      "provider_name",
      "api_key_masked",
      "api_key_length"
    ],
    "properties": {
      "api_key_length": {
        "type": "integer",
        "minimum": 0
      },
      "api_key_masked": {
        "type": "string"
      },
      "provider_name": {
        "type": "string"
      },
      "success": {
        "type": "boolean"
      }
    }
  },
  "MessageResponse": {
    "type": "object",
    "required": [
      "message"
    ],
    "properties": {
      "message": {
        "$ref": "#/components/schemas/MailMessage"
      }
    }
  },
  "MessagesResponse": {
    "type": "object",
    "required": [
      "messages"
    ],
    "properties": {
      "messages": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/MailMessage"
        }
      },
      "next_cursor": {
        "type": "string",
        "nullable": true
      }
    }
  },
  "ModelRow": {
    "type": "object",
    "description": "LLM model row for editor dropdowns.",
    "required": [
      "id",
      "name",
      "display_name",
      "provider_id",
      "is_active"
    ],
    "properties": {
      "context_window": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "deprecated_at": {
        "type": "string",
        "nullable": true
      },
      "display_name": {
        "type": "string"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "input_price_per_m": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "is_active": {
        "type": "boolean"
      },
      "max_output_tokens": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "name": {
        "type": "string"
      },
      "output_price_per_m": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "provider_id": {
        "type": "string",
        "format": "uuid"
      },
      "supports_audio": {
        "type": "boolean"
      },
      "supports_function_calling": {
        "type": "boolean"
      },
      "supports_streaming": {
        "type": "boolean"
      },
      "supports_vision": {
        "type": "boolean"
      }
    }
  },
  "PlatformApiKeyResponse": {
    "type": "object",
    "required": [
      "success"
    ],
    "properties": {
      "data": {
        "allOf": [
          {
            "$ref": "#/components/schemas/CreatePlatformApiKeyResponse"
          }
        ],
        "nullable": true
      },
      "success": {
        "type": "boolean"
      }
    }
  },
  "PolicyEnforcementAuditRow": {
    "type": "object",
    "description": "One immutable policy-enforcement evidence record.",
    "required": [
      "id",
      "organization_id",
      "run_id",
      "evaluation_id",
      "effect_index",
      "trigger",
      "decision",
      "evaluated_policies",
      "created_at"
    ],
    "properties": {
      "context_snapshot": {
        "nullable": true
      },
      "created_at": {
        "type": "string",
        "format": "date-time"
      },
      "decision": {
        "type": "string"
      },
      "effect_index": {
        "type": "integer",
        "format": "int32"
      },
      "evaluated_policies": {},
      "evaluation_id": {
        "type": "string",
        "format": "uuid"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "message": {
        "type": "string",
        "nullable": true
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "policy_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "policy_name": {
        "type": "string",
        "nullable": true
      },
      "run_id": {
        "type": "string",
        "format": "uuid"
      },
      "step_index": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "trigger": {
        "type": "string"
      },
      "workflow_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    }
  },
  "PolicyIR": {
    "type": "object",
    "description": "Governance policy IR stored in control plane.",
    "required": [
      "id",
      "schema_version",
      "name",
      "organization_id",
      "kind",
      "scope",
      "trigger",
      "condition",
      "effects",
      "priority",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "condition": {
        "$ref": "#/components/schemas/FilterExpr"
      },
      "created_at": {
        "type": "string",
        "format": "date-time"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "effects": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/PolicyEffect"
        },
        "maxItems": 64
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "kind": {
        "$ref": "#/components/schemas/PolicyKind"
      },
      "metadata": {
        "$ref": "#/components/schemas/PolicyMetadata"
      },
      "name": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "phase": {
        "$ref": "#/components/schemas/PolicyPhase"
      },
      "priority": {
        "type": "integer",
        "format": "int32"
      },
      "schema_version": {
        "type": "string"
      },
      "scope": {
        "$ref": "#/components/schemas/PolicyScope"
      },
      "trigger": {
        "$ref": "#/components/schemas/PolicyTrigger"
      },
      "updated_at": {
        "type": "string",
        "format": "date-time"
      },
      "workflow_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    }
  },
  "PolicyKind": {
    "oneOf": [
      {
        "type": "string",
        "enum": [
          "cost_control"
        ]
      },
      {
        "type": "string",
        "enum": [
          "security"
        ]
      },
      {
        "type": "string",
        "enum": [
          "access_control"
        ]
      },
      {
        "type": "string",
        "enum": [
          "rate_limit"
        ]
      },
      {
        "type": "object",
        "required": [
          "custom"
        ],
        "properties": {
          "custom": {
            "type": "string"
          }
        }
      }
    ],
    "description": "Policy kind - governance control type."
  },
  "PolicyInfo": {
    "type": "object",
    "description": "API-safe representation of a governance policy.",
    "required": [
      "id",
      "schema_version",
      "name",
      "organization_id",
      "kind",
      "scope",
      "trigger",
      "condition",
      "effects",
      "priority",
      "phase",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "condition": {},
      "created_at": {
        "type": "string",
        "format": "date-time"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "effects": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/PolicyEffect"
        },
        "maxItems": 64
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "kind": {
        "type": "string"
      },
      "metadata": {
        "$ref": "#/components/schemas/PolicyMetadata"
      },
      "name": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "phase": {
        "type": "string",
        "description": "String values accepted by this HTTP/DB boundary. The shared `PolicyPhase`\nIR also has a data-carrying custom variant whose JSON shape is not a string,\nso it must not be used to describe these string-backed DTO fields.",
        "enum": [
          "default",
          "cost",
          "security",
          "business"
        ]
      },
      "priority": {
        "type": "integer",
        "format": "int32"
      },
      "schema_version": {
        "type": "string"
      },
      "scope": {
        "type": "string"
      },
      "trigger": {
        "type": "string"
      },
      "updated_at": {
        "type": "string",
        "format": "date-time"
      },
      "workflow_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    }
  },
  "PolicyResponse": {
    "type": "object",
    "required": [
      "success"
    ],
    "properties": {
      "data": {
        "allOf": [
          {
            "$ref": "#/components/schemas/PolicyInfo"
          }
        ],
        "nullable": true
      },
      "success": {
        "type": "boolean"
      }
    }
  },
  "PreflightIssue": {
    "type": "object",
    "required": [
      "severity",
      "code",
      "message",
      "path"
    ],
    "properties": {
      "code": {
        "type": "string"
      },
      "help": {
        "type": "string",
        "nullable": true
      },
      "location": {
        "type": "object"
      },
      "message": {
        "type": "string"
      },
      "metadata": {
        "type": "object",
        "additionalProperties": {
          "type": "string"
        }
      },
      "path": {
        "type": "string"
      },
      "reference_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "related": {
        "type": "array",
        "items": {
          "type": "object"
        }
      },
      "severity": {
        "type": "string"
      },
      "step_kind": {
        "type": "string",
        "nullable": true
      },
      "step_name": {
        "type": "string",
        "nullable": true
      }
    }
  },
  "PreflightPurpose": {
    "type": "string",
    "enum": [
      "save",
      "run"
    ]
  },
  "ProviderConnectionTestRequest": {
    "type": "object",
    "required": [
      "request_id",
      "expected_updated_at"
    ],
    "properties": {
      "allow_resource_usage": {
        "type": "boolean"
      },
      "expected_updated_at": {
        "type": "string",
        "format": "date-time"
      },
      "request_id": {
        "type": "string",
        "format": "uuid"
      }
    }
  },
  "ProviderInfo": {
    "type": "object",
    "required": [
      "provider",
      "name",
      "configured"
    ],
    "properties": {
      "configured": {
        "type": "boolean"
      },
      "name": {
        "type": "string"
      },
      "provider": {
        "type": "string"
      },
      "unavailable_reason": {
        "type": "string",
        "nullable": true
      }
    }
  },
  "ProviderProbeCancellationResponse": {
    "type": "object",
    "required": [
      "cancelled"
    ],
    "properties": {
      "cancelled": {
        "type": "boolean"
      }
    }
  },
  "ProviderRow": {
    "type": "object",
    "description": "Provider row for editor dropdowns.",
    "required": [
      "id",
      "name",
      "display_name"
    ],
    "properties": {
      "display_name": {
        "type": "string"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "name": {
        "type": "string"
      }
    }
  },
  "ProvidersResponse": {
    "type": "object",
    "required": [
      "providers"
    ],
    "properties": {
      "providers": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/ProviderInfo"
        }
      }
    }
  },
  "ReferenceDataPage": {
    "anyOf": [
      {
        "type": "object",
        "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
        "required": [
          "items"
        ],
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AgentWithTools"
            }
          },
          "next_cursor": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "type": "object",
        "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
        "required": [
          "items"
        ],
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ToolListRow"
            }
          },
          "next_cursor": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "type": "object",
        "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
        "required": [
          "items"
        ],
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ProviderRow"
            }
          },
          "next_cursor": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "type": "object",
        "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
        "required": [
          "items"
        ],
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/ModelRow"
            }
          },
          "next_cursor": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "type": "object",
        "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
        "required": [
          "items"
        ],
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/EmbeddingModelRow"
            }
          },
          "next_cursor": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "type": "object",
        "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
        "required": [
          "items"
        ],
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/InstructionList"
            }
          },
          "next_cursor": {
            "type": "string",
            "nullable": true
          }
        }
      },
      {
        "type": "object",
        "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
        "required": [
          "items"
        ],
        "properties": {
          "items": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/KnowledgeSourceListRow"
            }
          },
          "next_cursor": {
            "type": "string",
            "nullable": true
          }
        }
      }
    ]
  },
  "ToolListRow": {
    "type": "object",
    "description": "Summary row for tool list (no spec for lighter payloads).",
    "required": [
      "id",
      "name",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "created_at": {
        "type": "string"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "is_builtin": {
        "type": "boolean"
      },
      "kind": {
        "type": "string",
        "description": "Tool kind extracted from `spec.kind` (e.g. \"http\", \"email\", \"database\").",
        "nullable": true
      },
      "name": {
        "type": "string"
      },
      "updated_at": {
        "type": "string"
      }
    }
  },
  "ReferenceFamily": {
    "type": "string",
    "enum": [
      "agents",
      "tools",
      "providers",
      "models",
      "embedding_models",
      "instructions",
      "knowledge_sources"
    ]
  },
  "ReportTemplateSummary": {
    "type": "object",
    "description": "Summary row for listing templates (no content field).",
    "required": [
      "id",
      "name",
      "field_schema",
      "version",
      "is_active",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "created_at": {
        "type": "string",
        "format": "date-time"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "field_schema": {},
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "is_active": {
        "type": "boolean"
      },
      "name": {
        "type": "string"
      },
      "updated_at": {
        "type": "string",
        "format": "date-time"
      },
      "version": {
        "type": "integer",
        "format": "int32"
      }
    }
  },
  "ReportTemplateVersionRow": {
    "type": "object",
    "description": "Immutable version archive row.",
    "required": [
      "id",
      "template_id",
      "version",
      "content",
      "field_schema",
      "created_at"
    ],
    "properties": {
      "content": {
        "type": "string"
      },
      "created_at": {
        "type": "string",
        "format": "date-time"
      },
      "field_schema": {},
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "page_config": {
        "nullable": true
      },
      "template_id": {
        "type": "string",
        "format": "uuid"
      },
      "version": {
        "type": "integer",
        "format": "int32"
      }
    }
  },
  "RuleInfo": {
    "type": "object",
    "description": "API-safe representation of an organization Guardian rule.",
    "required": [
      "id",
      "schema_version",
      "organization_id",
      "name",
      "version",
      "status",
      "enforcement",
      "applicability",
      "targets",
      "condition",
      "reason_code",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "applicability": {
        "type": "string"
      },
      "condition": {},
      "created_at": {
        "type": "string",
        "format": "date-time"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "enforcement": {
        "type": "string"
      },
      "guidance": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "name": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "reason_code": {
        "type": "string"
      },
      "schema_version": {
        "type": "string"
      },
      "status": {
        "type": "string"
      },
      "targets": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "updated_at": {
        "type": "string",
        "format": "date-time"
      },
      "version": {
        "type": "integer",
        "format": "int32"
      }
    }
  },
  "RuleResponse": {
    "type": "object",
    "required": [
      "success"
    ],
    "properties": {
      "data": {
        "allOf": [
          {
            "$ref": "#/components/schemas/RuleInfo"
          }
        ],
        "nullable": true
      },
      "success": {
        "type": "boolean"
      }
    }
  },
  "RulesetInfo": {
    "type": "object",
    "description": "API-safe representation of a business ruleset.",
    "required": [
      "id",
      "schema_version",
      "name",
      "organization_id",
      "kind",
      "scope",
      "trigger",
      "condition",
      "effects",
      "priority",
      "phase",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "condition": {},
      "created_at": {
        "type": "string",
        "format": "date-time"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "effects": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/RulesetEffect"
        },
        "maxItems": 64
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "kind": {
        "type": "string"
      },
      "metadata": {
        "$ref": "#/components/schemas/PolicyMetadata"
      },
      "name": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "phase": {
        "type": "string",
        "description": "String values accepted by this HTTP/DB boundary. The shared `PolicyPhase`\nIR also has a data-carrying custom variant whose JSON shape is not a string,\nso it must not be used to describe these string-backed DTO fields.",
        "enum": [
          "default",
          "cost",
          "security",
          "business"
        ]
      },
      "priority": {
        "type": "integer",
        "format": "int32"
      },
      "schema_version": {
        "type": "string"
      },
      "scope": {
        "type": "string"
      },
      "trigger": {
        "type": "string"
      },
      "updated_at": {
        "type": "string",
        "format": "date-time"
      }
    }
  },
  "RulesetResponse": {
    "type": "object",
    "required": [
      "success"
    ],
    "properties": {
      "data": {
        "allOf": [
          {
            "$ref": "#/components/schemas/RulesetInfo"
          }
        ],
        "nullable": true
      },
      "success": {
        "type": "boolean"
      }
    }
  },
  "ServiceAccountInfo": {
    "type": "object",
    "description": "Service account info from the `service_accounts_with_roles` view.",
    "required": [
      "id",
      "organization_id",
      "name",
      "role_id",
      "is_active",
      "created_at",
      "updated_at",
      "role_name",
      "permissions"
    ],
    "properties": {
      "created_at": {
        "type": "string",
        "format": "date-time"
      },
      "created_by": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "is_active": {
        "type": "boolean"
      },
      "name": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "permissions": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "role_id": {
        "type": "string",
        "format": "uuid"
      },
      "role_name": {
        "type": "string"
      },
      "updated_at": {
        "type": "string",
        "format": "date-time"
      }
    }
  },
  "ServiceAccountResponse": {
    "type": "object",
    "required": [
      "success"
    ],
    "properties": {
      "data": {
        "allOf": [
          {
            "$ref": "#/components/schemas/ServiceAccountInfo"
          }
        ],
        "nullable": true
      },
      "success": {
        "type": "boolean"
      }
    }
  },
  "SetChatProductAccessRequest": {
    "type": "object",
    "required": [
      "replace_ids",
      "rules"
    ],
    "properties": {
      "replace_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        }
      },
      "rules": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/ChatProductAccessRuleInput"
        }
      }
    }
  },
  "SetKnowledgeBaseAccessRequest": {
    "type": "object",
    "required": [
      "replace_ids",
      "rules"
    ],
    "properties": {
      "replace_ids": {
        "type": "array",
        "items": {
          "type": "string",
          "format": "uuid"
        }
      },
      "rules": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/KnowledgeBaseAccessRuleInput"
        }
      }
    }
  },
  "StoredDataUsageCategory": {
    "type": "object",
    "required": [
      "category",
      "current_bytes",
      "item_count",
      "month_to_date_byte_hours",
      "projected_byte_hours",
      "measurement_quality",
      "metadata"
    ],
    "properties": {
      "category": {
        "type": "string"
      },
      "current_bytes": {
        "type": "integer",
        "format": "int64"
      },
      "item_count": {
        "type": "integer",
        "format": "int64"
      },
      "latest_snapshot_at": {
        "type": "string",
        "format": "date-time",
        "nullable": true
      },
      "measurement_quality": {
        "type": "string"
      },
      "metadata": {},
      "month_to_date_byte_hours": {
        "type": "number",
        "format": "double"
      },
      "projected_byte_hours": {
        "type": "number",
        "format": "double"
      }
    }
  },
  "StoredDataUsageSummary": {
    "type": "object",
    "required": [
      "organization_id",
      "period_start",
      "period_end",
      "observed_at",
      "current_bytes",
      "month_to_date_byte_hours",
      "projected_byte_hours",
      "overage_byte_hours",
      "categories"
    ],
    "properties": {
      "allowance_byte_hours": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "allowance_bytes": {
        "type": "integer",
        "format": "int64",
        "nullable": true
      },
      "categories": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/StoredDataUsageCategory"
        }
      },
      "current_bytes": {
        "type": "integer",
        "format": "int64"
      },
      "current_percent": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "month_to_date_byte_hours": {
        "type": "number",
        "format": "double"
      },
      "observed_at": {
        "type": "string",
        "format": "date-time"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "overage_byte_hours": {
        "type": "number",
        "format": "double"
      },
      "overage_rate_usd_per_gb_hour": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "overage_usd": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "period_end": {
        "type": "string",
        "format": "date-time"
      },
      "period_start": {
        "type": "string",
        "format": "date-time"
      },
      "projected_byte_hours": {
        "type": "number",
        "format": "double"
      },
      "projected_percent": {
        "type": "number",
        "format": "double",
        "nullable": true
      }
    }
  },
  "SubscriptionPlan": {
    "type": "object",
    "description": "A subscription plan tier definition (read from DB).",
    "required": [
      "id",
      "name",
      "display_name",
      "price_monthly_usd",
      "price_annual_usd",
      "max_users",
      "max_agents",
      "max_workflows",
      "max_requests_per_day",
      "max_knowledge_sources",
      "max_knowledge_docs_per_source",
      "max_mcp_configs",
      "max_triggers",
      "features",
      "sort_order",
      "is_active",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "created_at": {
        "type": "string",
        "format": "date-time"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "display_name": {
        "type": "string"
      },
      "features": {},
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "is_active": {
        "type": "boolean"
      },
      "max_agents": {
        "type": "integer",
        "format": "int32"
      },
      "max_knowledge_docs_per_source": {
        "type": "integer",
        "format": "int32"
      },
      "max_knowledge_sources": {
        "type": "integer",
        "format": "int32"
      },
      "max_mcp_configs": {
        "type": "integer",
        "format": "int32"
      },
      "max_requests_per_day": {
        "type": "integer",
        "format": "int32"
      },
      "max_triggers": {
        "type": "integer",
        "format": "int32"
      },
      "max_users": {
        "type": "integer",
        "format": "int32"
      },
      "max_workflows": {
        "type": "integer",
        "format": "int32"
      },
      "monthly_token_limit": {
        "type": "integer",
        "format": "int64",
        "nullable": true
      },
      "monthly_workflow_run_limit": {
        "type": "integer",
        "format": "int64",
        "nullable": true
      },
      "name": {
        "type": "string"
      },
      "price_annual_usd": {
        "type": "number",
        "format": "double"
      },
      "price_monthly_usd": {
        "type": "number",
        "format": "double"
      },
      "sort_order": {
        "type": "integer",
        "format": "int32"
      },
      "updated_at": {
        "type": "string",
        "format": "date-time"
      }
    }
  },
  "SubscriptionResponse": {
    "type": "object",
    "description": "Effective organization subscription and resolved limits.",
    "required": [
      "success",
      "subscription"
    ],
    "properties": {
      "subscription": {
        "$ref": "#/components/schemas/EffectiveLimits"
      },
      "success": {
        "type": "boolean"
      }
    }
  },
  "SystemInfo": {
    "type": "object",
    "description": "API-safe representation of a System (deployment context).",
    "required": [
      "id",
      "organization_id",
      "name",
      "slug",
      "is_default",
      "is_active",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "auth_config_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "auth_config_name": {
        "type": "string",
        "nullable": true
      },
      "chat_product_count": {
        "type": "integer",
        "format": "int64",
        "nullable": true
      },
      "created_at": {
        "type": "string",
        "format": "date-time"
      },
      "database_config_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "database_config_name": {
        "type": "string",
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "is_active": {
        "type": "boolean"
      },
      "is_default": {
        "type": "boolean"
      },
      "name": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "provider_connection_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "provider_connection_name": {
        "type": "string",
        "description": "Joined name for display (populated by detail lookup).",
        "nullable": true
      },
      "slug": {
        "type": "string"
      },
      "storage_config_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "storage_config_name": {
        "type": "string",
        "nullable": true
      },
      "updated_at": {
        "type": "string",
        "format": "date-time"
      },
      "workflow_count": {
        "type": "integer",
        "format": "int64",
        "nullable": true
      }
    }
  },
  "SystemResponse": {
    "type": "object",
    "required": [
      "success"
    ],
    "properties": {
      "data": {
        "allOf": [
          {
            "$ref": "#/components/schemas/SystemInfo"
          }
        ],
        "nullable": true
      },
      "success": {
        "type": "boolean"
      }
    }
  },
  "SystemUsageItem": {
    "type": "object",
    "description": "A single workflow or chat product referencing a system.",
    "required": [
      "kind",
      "id",
      "name"
    ],
    "properties": {
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "kind": {
        "type": "string",
        "description": "`workflows` or `chat_products`."
      },
      "name": {
        "type": "string"
      },
      "slug": {
        "type": "string",
        "nullable": true
      }
    }
  },
  "TestConnectionResponse": {
    "type": "object",
    "description": "A bounded probe response is observed evidence, never a capability certificate.",
    "required": [
      "success",
      "latency_ms",
      "evidence"
    ],
    "properties": {
      "evidence": {
        "$ref": "#/components/schemas/ConnectionProbeEvidence"
      },
      "latency_ms": {
        "type": "integer",
        "format": "int64",
        "minimum": 0
      },
      "success": {
        "type": "boolean"
      }
    }
  },
  "ToolFullRow": {
    "type": "object",
    "description": "Full tool row including timestamps (for single-tool fetch/edit).",
    "required": [
      "id",
      "name",
      "spec",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "created_at": {
        "type": "string"
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "is_builtin": {
        "type": "boolean"
      },
      "name": {
        "type": "string"
      },
      "spec": {},
      "updated_at": {
        "type": "string"
      }
    }
  },
  "ToolInsert": {
    "type": "object",
    "description": "Insert payload for creating a tool.",
    "required": [
      "name",
      "spec"
    ],
    "properties": {
      "description": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid",
        "description": "Tenant organization ID — set server-side from auth context.",
        "nullable": true
      },
      "spec": {}
    }
  },
  "ToolResponse": {
    "type": "object",
    "description": "Single tool wrapper.",
    "required": [
      "tool"
    ],
    "properties": {
      "tool": {
        "$ref": "#/components/schemas/ToolFullRow"
      }
    }
  },
  "ToolUpdate": {
    "type": "object",
    "description": "Partial update payload for tools (all fields optional).",
    "properties": {
      "description": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "spec": {
        "nullable": true
      }
    }
  },
  "UpdatePolicyRequest": {
    "type": "object",
    "description": "Request body for updating a policy (PATCH semantics).",
    "properties": {
      "condition": {
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "effects": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/PolicyEffect"
        },
        "maxItems": 64
      },
      "kind": {
        "type": "string",
        "nullable": true
      },
      "metadata": {
        "allOf": [
          {
            "$ref": "#/components/schemas/PolicyMetadata"
          }
        ],
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "phase": {
        "allOf": [
          {
            "type": "string",
            "description": "String values accepted by this HTTP/DB boundary. The shared `PolicyPhase`\nIR also has a data-carrying custom variant whose JSON shape is not a string,\nso it must not be used to describe these string-backed DTO fields.",
            "enum": [
              "default",
              "cost",
              "security",
              "business"
            ]
          }
        ],
        "nullable": true
      },
      "priority": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "scope": {
        "type": "string",
        "nullable": true
      },
      "trigger": {
        "type": "string",
        "nullable": true
      },
      "workflow_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    }
  },
  "UpdateRuleRequest": {
    "type": "object",
    "description": "Request body for updating a rule. Omitted fields stay unchanged; send\n`null` to clear `description` or `guidance`. Every accepted update bumps the\nrule version.",
    "properties": {
      "applicability": {
        "type": "string",
        "nullable": true
      },
      "condition": {
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "enforcement": {
        "type": "string",
        "nullable": true
      },
      "guidance": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "reason_code": {
        "type": "string",
        "nullable": true
      },
      "status": {
        "type": "string",
        "description": "`draft`, `published`, or `retired`.",
        "nullable": true
      },
      "targets": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "nullable": true
      }
    }
  },
  "UpdateRulesetRequest": {
    "type": "object",
    "description": "Request body for updating a ruleset (PATCH semantics).",
    "properties": {
      "condition": {
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "effects": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/RulesetEffect"
        },
        "maxItems": 64
      },
      "kind": {
        "type": "string",
        "nullable": true
      },
      "metadata": {
        "allOf": [
          {
            "$ref": "#/components/schemas/PolicyMetadata"
          }
        ],
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "phase": {
        "allOf": [
          {
            "type": "string",
            "description": "String values accepted by this HTTP/DB boundary. The shared `PolicyPhase`\nIR also has a data-carrying custom variant whose JSON shape is not a string,\nso it must not be used to describe these string-backed DTO fields.",
            "enum": [
              "default",
              "cost",
              "security",
              "business"
            ]
          }
        ],
        "nullable": true
      },
      "priority": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "scope": {
        "type": "string",
        "nullable": true
      },
      "trigger": {
        "type": "string",
        "nullable": true
      }
    }
  },
  "UpdateServiceAccountRequest": {
    "type": "object",
    "description": "Request to update an existing service account (PATCH semantics).",
    "properties": {
      "description": {
        "type": "string",
        "nullable": true
      },
      "is_active": {
        "type": "boolean",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "role_name": {
        "type": "string",
        "nullable": true
      }
    }
  },
  "UpdateSubscriptionRequest": {
    "type": "object",
    "description": "Request body for changing an org's subscription plan.",
    "required": [
      "plan_name"
    ],
    "properties": {
      "billing_interval": {
        "type": "string",
        "nullable": true
      },
      "plan_name": {
        "type": "string"
      }
    }
  },
  "UpdateSystemRequest": {
    "type": "object",
    "description": "Request body for updating a system (PATCH semantics).",
    "properties": {
      "auth_config_id": {
        "nullable": true
      },
      "database_config_id": {
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "is_active": {
        "type": "boolean",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "provider_connection_id": {
        "description": "Use `serde_json::Value::Null` to clear.",
        "nullable": true
      },
      "slug": {
        "type": "string",
        "nullable": true
      },
      "storage_config_id": {
        "nullable": true
      }
    }
  },
  "UpsertCredentialRequest": {
    "type": "object",
    "description": "Request body for upserting API credentials.",
    "required": [
      "provider_name",
      "api_key"
    ],
    "properties": {
      "api_key": {
        "type": "string",
        "description": "The API key (will be encrypted before storage)."
      },
      "base_url": {
        "type": "string",
        "description": "Optional custom base URL for the provider.",
        "nullable": true
      },
      "label": {
        "type": "string",
        "description": "Optional label to identify this credential.",
        "nullable": true
      },
      "provider_name": {
        "type": "string",
        "description": "Provider name: \"openai\", \"anthropic\", \"gemini\", \"fireworks\", etc."
      }
    }
  },
  "UsageBillingFeedEvent": {
    "allOf": [
      {
        "$ref": "#/components/schemas/UsageEvent"
      },
      {
        "type": "object",
        "properties": {
          "run_duration_ms": {
            "type": "integer",
            "format": "int64",
            "nullable": true
          },
          "workflow_name": {
            "type": "string",
            "nullable": true
          }
        }
      }
    ]
  },
  "UsageEvent": {
    "type": "object",
    "required": [
      "id",
      "organization_id",
      "source",
      "usage_key",
      "unit",
      "quantity",
      "billable",
      "platform_owned",
      "measurement_quality",
      "idempotency_key",
      "metadata",
      "created_at",
      "created_at_date"
    ],
    "properties": {
      "billable": {
        "type": "boolean"
      },
      "cost_usd": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "created_at": {
        "type": "string",
        "format": "date-time"
      },
      "created_at_date": {
        "type": "string",
        "format": "date"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "idempotency_key": {
        "type": "string"
      },
      "measurement_quality": {
        "type": "string"
      },
      "metadata": {},
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "platform_owned": {
        "type": "boolean"
      },
      "quantity": {
        "type": "number",
        "format": "double"
      },
      "run_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "source": {
        "type": "string"
      },
      "system_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "unit": {
        "type": "string"
      },
      "usage_key": {
        "type": "string"
      },
      "user_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "workflow_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    }
  },
  "UsageDailyRollup": {
    "type": "object",
    "required": [
      "organization_id",
      "date",
      "source",
      "usage_key",
      "unit",
      "billable",
      "platform_owned",
      "measurement_quality",
      "event_count",
      "total_quantity",
      "total_cost_usd",
      "last_event_at"
    ],
    "properties": {
      "billable": {
        "type": "boolean"
      },
      "date": {
        "type": "string",
        "format": "date"
      },
      "event_count": {
        "type": "integer",
        "format": "int64"
      },
      "last_event_at": {
        "type": "string",
        "format": "date-time"
      },
      "measurement_quality": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "platform_owned": {
        "type": "boolean"
      },
      "source": {
        "type": "string"
      },
      "total_cost_usd": {
        "type": "number",
        "format": "double"
      },
      "total_quantity": {
        "type": "number",
        "format": "double"
      },
      "unit": {
        "type": "string"
      },
      "usage_key": {
        "type": "string"
      }
    }
  },
  "UsageSummary": {
    "type": "object",
    "required": [
      "date",
      "organization_id",
      "request_count"
    ],
    "properties": {
      "avg_execution_time_ms": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "date": {
        "type": "string"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid"
      },
      "request_count": {
        "type": "integer",
        "format": "int64"
      },
      "total_cost_usd": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "total_input_tokens": {
        "type": "integer",
        "format": "int64",
        "nullable": true
      },
      "total_output_tokens": {
        "type": "integer",
        "format": "int64",
        "nullable": true
      },
      "total_tokens": {
        "type": "integer",
        "format": "int64",
        "nullable": true
      }
    }
  },
  "UsageTotals": {
    "type": "object",
    "description": "Aggregated usage for a date range (from `get_org_usage_totals` RPC over `api_usage` rows).",
    "required": [
      "request_count",
      "total_tokens",
      "total_input_tokens",
      "total_output_tokens",
      "total_cost_usd"
    ],
    "properties": {
      "avg_execution_time_ms": {
        "type": "number",
        "format": "double",
        "nullable": true
      },
      "request_count": {
        "type": "integer",
        "format": "int64"
      },
      "total_cost_usd": {
        "type": "number",
        "format": "double"
      },
      "total_input_tokens": {
        "type": "integer",
        "format": "int64"
      },
      "total_output_tokens": {
        "type": "integer",
        "format": "int64"
      },
      "total_tokens": {
        "type": "integer",
        "format": "int64"
      }
    }
  },
  "VerifyVersionRequest": {
    "type": "object",
    "description": "Request body for version verification.",
    "required": [
      "name",
      "version",
      "package_hash"
    ],
    "properties": {
      "name": {
        "type": "string"
      },
      "package_hash": {
        "type": "string"
      },
      "version": {
        "type": "string"
      }
    }
  },
  "VerifyVersionResponse": {
    "type": "object",
    "description": "Response body for version verification.",
    "required": [
      "valid"
    ],
    "properties": {
      "reason": {
        "type": "string",
        "nullable": true
      },
      "valid": {
        "type": "boolean"
      }
    }
  },
  "VersionSummaryResponse": {
    "type": "object",
    "description": "A single workflow package version summary in list responses.",
    "required": [
      "id",
      "package_name",
      "package_version",
      "schema_version",
      "package_hash",
      "validation_ok",
      "created_at"
    ],
    "properties": {
      "created_at": {
        "type": "string"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "package_hash": {
        "type": "string"
      },
      "package_name": {
        "type": "string"
      },
      "package_version": {
        "type": "string"
      },
      "schema_version": {
        "type": "string"
      },
      "validation_ok": {
        "type": "boolean"
      }
    }
  },
  "WorkflowCheckpointSummary": {
    "type": "object",
    "description": "Public checkpoint inspection, without private continuation state.",
    "required": [
      "id",
      "run_id",
      "step_index",
      "step_kind",
      "status",
      "step_traces",
      "duration_ms",
      "created_at"
    ],
    "properties": {
      "completed_at": {
        "type": "string",
        "nullable": true
      },
      "created_at": {
        "type": "string"
      },
      "duration_ms": {
        "type": "integer",
        "format": "int64"
      },
      "error": {
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "run_id": {
        "type": "string",
        "format": "uuid"
      },
      "started_at": {
        "type": "string",
        "nullable": true
      },
      "status": {
        "type": "string"
      },
      "step_index": {
        "type": "integer",
        "format": "int32"
      },
      "step_kind": {
        "type": "string"
      },
      "step_name": {
        "type": "string",
        "nullable": true
      },
      "step_traces": {}
    }
  },
  "WorkflowFullRow": {
    "type": "object",
    "description": "Full workflow row including node_positions for the editor.",
    "required": [
      "id",
      "name",
      "definition",
      "is_active",
      "version",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "archived_at": {
        "type": "string",
        "description": "When the workflow was archived; `None` while it is active.",
        "nullable": true
      },
      "auth_config_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "boundary_config": {},
      "boundary_type": {
        "type": "string"
      },
      "created_at": {
        "type": "string"
      },
      "default_auth_config_id": {
        "type": "string",
        "format": "uuid",
        "description": "Per-workflow auth config override.",
        "nullable": true
      },
      "default_database_config_id": {
        "type": "string",
        "format": "uuid",
        "description": "Per-workflow database config override.",
        "nullable": true
      },
      "default_storage_config_id": {
        "type": "string",
        "format": "uuid",
        "description": "Per-workflow storage config override.",
        "nullable": true
      },
      "definition": {},
      "description": {
        "type": "string",
        "nullable": true
      },
      "execution_scope": {
        "type": "string"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "identity_strategy": {
        "type": "string"
      },
      "is_active": {
        "type": "boolean"
      },
      "name": {
        "type": "string"
      },
      "node_positions": {
        "nullable": true
      },
      "system_id": {
        "type": "string",
        "format": "uuid",
        "description": "The system this workflow belongs to.",
        "nullable": true
      },
      "updated_at": {
        "type": "string"
      },
      "version": {
        "type": "integer",
        "format": "int32"
      },
      "visual_nodes": {
        "description": "Visual-only canvas metadata (e.g., reroute waypoints). Opaque JSON blob owned by the frontend.",
        "nullable": true
      }
    }
  },
  "WorkflowGateSummary": {
    "type": "object",
    "description": "Public gate inspection, without private continuation state.",
    "required": [
      "id",
      "run_id",
      "step_index",
      "gate_type",
      "prompt",
      "metadata",
      "status",
      "step_traces",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "created_at": {
        "type": "string"
      },
      "deployment_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "environment_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "expires_at": {
        "type": "string",
        "nullable": true
      },
      "gate_type": {
        "type": "string"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "metadata": {},
      "options": {
        "nullable": true
      },
      "organization_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "prompt": {
        "type": "string"
      },
      "resolution_source": {
        "type": "string",
        "description": "Which kind of principal resolved the gate: `user`, `service_account`, or\n`timeout`. `None` means the kind was not recorded and must never be read as\na human approval.",
        "nullable": true
      },
      "resolved_at": {
        "type": "string",
        "nullable": true
      },
      "resolved_by": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "response": {
        "nullable": true
      },
      "response_attachments": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/Attachment"
        }
      },
      "resume_claimed_at": {
        "type": "string",
        "description": "Set atomically with the owning run's transition back to running.",
        "nullable": true
      },
      "run_id": {
        "type": "string",
        "format": "uuid"
      },
      "status": {
        "$ref": "#/components/schemas/InteractionState"
      },
      "step_index": {
        "type": "integer",
        "format": "int32"
      },
      "step_name": {
        "type": "string",
        "nullable": true
      },
      "step_traces": {},
      "timeout_action": {
        "type": "string",
        "description": "The action applied at the deadline: `approve`, `reject`, or `skip`.",
        "nullable": true
      },
      "updated_at": {
        "type": "string"
      }
    }
  },
  "WorkflowInsert": {
    "type": "object",
    "description": "Insert payload for creating a workflow.",
    "required": [
      "name",
      "definition"
    ],
    "properties": {
      "auth_config_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "boundary_config": {},
      "boundary_type": {
        "type": "string"
      },
      "default_auth_config_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "default_database_config_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "default_storage_config_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "definition": {},
      "description": {
        "type": "string",
        "nullable": true
      },
      "execution_scope": {
        "type": "string"
      },
      "identity_strategy": {
        "type": "string"
      },
      "name": {
        "type": "string"
      },
      "node_positions": {
        "nullable": true
      },
      "organization_id": {
        "type": "string",
        "format": "uuid",
        "description": "Tenant organization ID — set server-side from auth context.",
        "nullable": true
      },
      "system_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "visual_nodes": {
        "nullable": true
      }
    }
  },
  "WorkflowListRow": {
    "type": "object",
    "description": "Summary row for workflow list (excludes node_positions for lighter payloads).",
    "required": [
      "id",
      "name",
      "definition",
      "is_active",
      "version",
      "created_at",
      "updated_at"
    ],
    "properties": {
      "archived_at": {
        "type": "string",
        "description": "When the workflow was archived; `None` while it is active.",
        "nullable": true
      },
      "auth_config_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "boundary_config": {},
      "boundary_type": {
        "type": "string"
      },
      "created_at": {
        "type": "string"
      },
      "default_auth_config_id": {
        "type": "string",
        "format": "uuid",
        "description": "Per-workflow auth config override.",
        "nullable": true
      },
      "default_database_config_id": {
        "type": "string",
        "format": "uuid",
        "description": "Per-workflow database config override.",
        "nullable": true
      },
      "default_storage_config_id": {
        "type": "string",
        "format": "uuid",
        "description": "Per-workflow storage config override.",
        "nullable": true
      },
      "definition": {},
      "description": {
        "type": "string",
        "nullable": true
      },
      "execution_scope": {
        "type": "string"
      },
      "expose_as_mcp": {
        "type": "boolean",
        "description": "Whether this workflow is exposed as an MCP tool (default: false)."
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "identity_strategy": {
        "type": "string"
      },
      "is_active": {
        "type": "boolean"
      },
      "name": {
        "type": "string"
      },
      "system_id": {
        "type": "string",
        "format": "uuid",
        "description": "The system this workflow belongs to.",
        "nullable": true
      },
      "updated_at": {
        "type": "string"
      },
      "version": {
        "type": "integer",
        "format": "int32"
      }
    }
  },
  "WorkflowPackageVersion": {
    "type": "object",
    "description": "Immutable governed workflow package version row.",
    "required": [
      "id",
      "package_name",
      "package_version",
      "schema_version",
      "package_hash",
      "package_json",
      "workflow_definition",
      "validation_result",
      "validation_ok",
      "created_at"
    ],
    "properties": {
      "actor_user_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "created_at": {
        "type": "string"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "organization_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "package_hash": {
        "type": "string"
      },
      "package_json": {
        "type": "object"
      },
      "package_name": {
        "type": "string"
      },
      "package_version": {
        "type": "string"
      },
      "schema_version": {
        "type": "string"
      },
      "validation_ok": {
        "type": "boolean"
      },
      "validation_result": {
        "type": "object"
      },
      "workflow_definition": {
        "type": "object"
      },
      "workflow_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    }
  },
  "WorkflowPreflightRequest": {
    "type": "object",
    "properties": {
      "definition": {
        "nullable": true
      },
      "environment_id": {
        "type": "string",
        "format": "uuid",
        "description": "Exact environment identity to validate for a plan or run.",
        "nullable": true
      },
      "environment_slug": {
        "type": "string",
        "description": "Organization-scoped environment slug to resolve for a plan or run.",
        "nullable": true,
        "maxLength": 128,
        "minLength": 1,
        "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$"
      },
      "purpose": {
        "$ref": "#/components/schemas/PreflightPurpose"
      },
      "streaming": {
        "type": "boolean",
        "description": "Validate streaming capabilities for a streaming run; saves default to non-streaming."
      },
      "system_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "workflow_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    }
  },
  "WorkflowPreflightResponse": {
    "type": "object",
    "required": [
      "errors",
      "ok",
      "warnings"
    ],
    "properties": {
      "errors": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/PreflightIssue"
        }
      },
      "ok": {
        "type": "boolean"
      },
      "resolved_environment_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "warnings": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/PreflightIssue"
        }
      }
    }
  },
  "WorkflowResponse": {
    "type": "object",
    "description": "Single workflow wrapper.",
    "required": [
      "workflow"
    ],
    "properties": {
      "workflow": {
        "$ref": "#/components/schemas/WorkflowFullRow"
      }
    }
  },
  "WorkflowRestoreResponse": {
    "type": "object",
    "description": "Response for restoring an archived workflow.",
    "required": [
      "message",
      "workflow"
    ],
    "properties": {
      "message": {
        "type": "string"
      },
      "workflow": {
        "$ref": "#/components/schemas/WorkflowFullRow"
      }
    }
  },
  "WorkflowResumeRequest": {
    "type": "object",
    "description": "Resume a failed run or consume its recorded, unclaimed interaction answer.\nAuthentication is injected from the bearer header and is not part of this contract.",
    "required": [
      "run_id"
    ],
    "properties": {
      "deployment_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "environment_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "from_step": {
        "type": "integer",
        "nullable": true,
        "minimum": 0
      },
      "provider_params": {
        "allOf": [
          {
            "$ref": "#/components/schemas/ProviderParams"
          }
        ],
        "nullable": true
      },
      "run_id": {
        "type": "string",
        "format": "uuid"
      },
      "stream": {
        "type": "boolean"
      },
      "system_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "variables": {
        "type": "object",
        "additionalProperties": {
          "type": "string"
        },
        "nullable": true
      }
    }
  },
  "WorkflowRunRequest": {
    "type": "object",
    "description": "Request body for workflow execution endpoints.\n\nThis mirrors the public, serialized subset of `WorkflowRunReq`. Runtime-only\nfields such as tenant context, HTTP clients, and email services are injected\nserver-side and are intentionally absent from the API contract.",
    "required": [
      "input"
    ],
    "properties": {
      "attachments": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/Attachment"
        },
        "description": "Attachment metadata/payloads.",
        "maxItems": 5,
        "nullable": true
      },
      "checkpoint_mode": {
        "$ref": "#/components/schemas/CheckpointMode"
      },
      "conversation_id": {
        "type": "string",
        "format": "uuid",
        "description": "Conversation id for memory-aware runs.",
        "nullable": true
      },
      "decision_trace_mode": {
        "$ref": "#/components/schemas/DecisionTraceMode"
      },
      "deployment_id": {
        "type": "string",
        "format": "uuid",
        "description": "Non-null deployment selectors currently fail closed at execution admission.",
        "nullable": true
      },
      "environment_id": {
        "type": "string",
        "format": "uuid",
        "description": "Exact organization-scoped environment identity for this run.",
        "nullable": true
      },
      "environment_slug": {
        "type": "string",
        "description": "Organization-scoped environment slug resolved before execution.",
        "nullable": true,
        "maxLength": 128,
        "minLength": 1,
        "pattern": "^[a-z0-9]+(-[a-z0-9]+)*$"
      },
      "input": {
        "$ref": "#/components/schemas/JsonValue"
      },
      "memory_window_messages": {
        "type": "integer",
        "format": "int32",
        "description": "Memory window by message count.",
        "nullable": true,
        "minimum": 0
      },
      "memory_window_tokens": {
        "type": "integer",
        "format": "int32",
        "description": "Memory window by token budget.",
        "nullable": true,
        "minimum": 0
      },
      "provider_params": {
        "allOf": [
          {
            "$ref": "#/components/schemas/ProviderParams"
          }
        ],
        "nullable": true
      },
      "source": {
        "type": "string",
        "description": "Run source, for analytics: `canvas_test`, `chat_product`, or `api`.",
        "nullable": true
      },
      "stream": {
        "type": "boolean",
        "description": "The endpoint selects JSON or SSE."
      },
      "system_id": {
        "type": "string",
        "format": "uuid",
        "description": "System override for this run. If omitted, the workflow System then org default System is used.",
        "nullable": true
      },
      "use_memory": {
        "type": "boolean",
        "description": "Whether memory-aware steps may use conversation history.",
        "nullable": true
      },
      "variables": {
        "type": "object",
        "description": "Optional template variables.",
        "additionalProperties": {
          "type": "string"
        },
        "nullable": true
      },
      "workflow": {
        "allOf": [
          {
            "$ref": "#/components/schemas/Workflow"
          }
        ],
        "nullable": true
      },
      "workflow_id": {
        "type": "string",
        "format": "uuid",
        "description": "Saved workflow id to execute. Provide this or `workflow`.",
        "nullable": true
      }
    }
  },
  "WorkflowRunResponse": {
    "allOf": [
      {
        "$ref": "#/components/schemas/WorkflowRunRow"
      },
      {
        "type": "object",
        "required": [
          "is_test_run"
        ],
        "properties": {
          "is_test_run": {
            "type": "boolean"
          }
        }
      }
    ],
    "description": "Workflow run annotated with whether it was executed by a test account."
  },
  "WorkflowRunRow": {
    "type": "object",
    "description": "A row from the workflow_runs table.",
    "required": [
      "id",
      "user_id",
      "status",
      "input",
      "variables",
      "workflow_json",
      "checkpoint_mode",
      "step_count",
      "completed_steps",
      "started_at",
      "updated_at"
    ],
    "properties": {
      "checkpoint_mode": {
        "type": "string"
      },
      "completed_at": {
        "type": "string",
        "nullable": true
      },
      "completed_steps": {
        "type": "integer",
        "format": "int32"
      },
      "conversation_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "error": {
        "description": "Typed reason for a non-success outcome.\n\nA failed run carries `stage`, `message`, `error_kind` (an `ErrorKind`\nreason code), and `retryable`, plus bounded `guardian` evidence when a\ngovernance rule refused it. A cancelled run carries `stage` and\n`reason` (`cancelled`). `None` while the run is running, waiting for\ninput, or completed.",
        "nullable": true
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "input": {
        "type": "string"
      },
      "output": {
        "type": "string",
        "nullable": true
      },
      "provider_params": {
        "nullable": true
      },
      "source": {
        "type": "string",
        "description": "Origin of the run: \"canvas_test\", \"chat_product\", or \"api\"."
      },
      "started_at": {
        "type": "string"
      },
      "status": {
        "$ref": "#/components/schemas/RunState"
      },
      "step_count": {
        "type": "integer",
        "format": "int32"
      },
      "updated_at": {
        "type": "string"
      },
      "user_id": {
        "type": "string",
        "format": "uuid"
      },
      "variables": {},
      "workflow_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "workflow_json": {}
    }
  },
  "WorkflowRunStatsRow": {
    "type": "object",
    "description": "A row from the workflow_run_stats table (aggregated daily stats).",
    "required": [
      "id",
      "date",
      "source",
      "total_runs",
      "completed",
      "failed",
      "created_at"
    ],
    "properties": {
      "avg_duration_ms": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "avg_step_count": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "completed": {
        "type": "integer",
        "format": "int32"
      },
      "created_at": {
        "type": "string"
      },
      "date": {
        "type": "string"
      },
      "failed": {
        "type": "integer",
        "format": "int32"
      },
      "id": {
        "type": "string",
        "format": "uuid"
      },
      "p95_duration_ms": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "source": {
        "type": "string"
      },
      "total_runs": {
        "type": "integer",
        "format": "int32"
      },
      "total_tokens_used": {
        "type": "integer",
        "format": "int64",
        "nullable": true
      },
      "workflow_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      }
    }
  },
  "WorkflowTriggerTestRequest": {
    "type": "object",
    "properties": {
      "payload": {
        "nullable": true
      }
    },
    "additionalProperties": false
  },
  "WorkflowTriggerTestResponse": {
    "type": "object",
    "required": [
      "run_id",
      "status",
      "message"
    ],
    "properties": {
      "message": {
        "type": "string"
      },
      "run_id": {
        "type": "string",
        "format": "uuid"
      },
      "status": {
        "$ref": "#/components/schemas/WorkflowTriggerTestStatus"
      }
    }
  },
  "WorkflowTriggerTestStatus": {
    "type": "string",
    "enum": [
      "queued"
    ]
  },
  "WorkflowUpdate": {
    "type": "object",
    "description": "Partial update payload for workflows (all fields optional).",
    "properties": {
      "auth_config_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "boundary_config": {
        "nullable": true
      },
      "boundary_type": {
        "type": "string",
        "nullable": true
      },
      "default_auth_config_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "default_database_config_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "default_storage_config_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "definition": {
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "execution_scope": {
        "type": "string",
        "nullable": true
      },
      "identity_strategy": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "node_positions": {
        "nullable": true
      },
      "system_id": {
        "type": "string",
        "format": "uuid",
        "nullable": true
      },
      "visual_nodes": {
        "nullable": true
      }
    }
  },
  "WorkflowWaitingResponse": {
    "type": "object",
    "required": [
      "status",
      "gate_id",
      "run_id",
      "message"
    ],
    "properties": {
      "choices": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "nullable": true
      },
      "context": {
        "allOf": [
          {
            "$ref": "#/components/schemas/JsonValue"
          }
        ],
        "nullable": true
      },
      "expires_at": {
        "type": "string",
        "nullable": true
      },
      "gate_id": {
        "type": "string",
        "format": "uuid"
      },
      "guardian_guidance": {
        "type": "array",
        "items": {
          "type": "string"
        },
        "nullable": true
      },
      "message": {
        "type": "string"
      },
      "question": {
        "type": "string",
        "nullable": true
      },
      "response_type": {
        "type": "string",
        "nullable": true
      },
      "run_id": {
        "type": "string",
        "format": "uuid"
      },
      "status": {
        "$ref": "#/components/schemas/WorkflowWaitingStatus"
      },
      "timeout_action": {
        "type": "string",
        "nullable": true
      }
    }
  },
  "WorkflowWaitingStatus": {
    "type": "string",
    "enum": [
      "waiting_for_input"
    ]
  }
};
export const streamEventTypes: readonly string[] = ["conversation","message_complete","meta","step_start","delta","tool_call","tool_result","step_end","message","loop_progress","report_rendering","report_complete","final","summary","cancelled","error","checkpoint_saved","resume_start","fallback_triggered","retry","interaction_required","agent_delegation","agent_response","mcp_tool_call","mcp_tool_result","knowledge_results","fan_out_progress","run_started","resync","done"];
export const requestSchemas: Record<string, unknown> = {
  "POST /api/agent/run": {
    "$ref": "#/components/schemas/AgentExecutionRequest"
  },
  "POST /api/agent/stream": {
    "$ref": "#/components/schemas/AgentExecutionRequest"
  },
  "POST /api/agents": {
    "$ref": "#/components/schemas/AgentInsert"
  },
  "PUT /api/agents/{id}": {
    "$ref": "#/components/schemas/AgentUpdate"
  },
  "POST /api/business-connections/authorize": {
    "$ref": "#/components/schemas/AuthorizeRequest"
  },
  "POST /api/business-connections/callback": {
    "$ref": "#/components/schemas/CallbackRequest"
  },
  "PUT /api/chat-products/{id}/access": {
    "$ref": "#/components/schemas/SetChatProductAccessRequest"
  },
  "POST /api/chat-products/{id}/send": {
    "$ref": "#/components/schemas/ChatSendMessageRequest"
  },
  "POST /api/completion-node-models": {
    "$ref": "#/components/schemas/CompletionNodeModelInsert"
  },
  "PUT /api/completion-node-models/{id}": {
    "$ref": "#/components/schemas/CompletionNodeModelInsert"
  },
  "POST /api/control-plane/api-keys": {
    "$ref": "#/components/schemas/CreatePlatformApiKeyRequest"
  },
  "POST /api/control-plane/credentials": {
    "$ref": "#/components/schemas/UpsertCredentialRequest"
  },
  "POST /api/control-plane/inference-devices": {
    "$ref": "#/components/schemas/DeclareInferenceDevice"
  },
  "POST /api/control-plane/policies": {
    "$ref": "#/components/schemas/CreatePolicyRequest"
  },
  "PATCH /api/control-plane/policies/{id}": {
    "$ref": "#/components/schemas/UpdatePolicyRequest"
  },
  "POST /api/control-plane/provider-connections/{id}/test": {
    "$ref": "#/components/schemas/ProviderConnectionTestRequest"
  },
  "POST /api/control-plane/provider-connections/{id}/test/cancel": {
    "$ref": "#/components/schemas/ProviderConnectionTestRequest"
  },
  "POST /api/control-plane/rules": {
    "$ref": "#/components/schemas/CreateRuleRequest"
  },
  "PATCH /api/control-plane/rules/{id}": {
    "$ref": "#/components/schemas/UpdateRuleRequest"
  },
  "POST /api/control-plane/rulesets": {
    "$ref": "#/components/schemas/CreateRulesetRequest"
  },
  "PATCH /api/control-plane/rulesets/{id}": {
    "$ref": "#/components/schemas/UpdateRulesetRequest"
  },
  "POST /api/control-plane/service-accounts": {
    "$ref": "#/components/schemas/CreateServiceAccountRequest"
  },
  "PATCH /api/control-plane/service-accounts/{id}": {
    "$ref": "#/components/schemas/UpdateServiceAccountRequest"
  },
  "PUT /api/control-plane/subscription": {
    "$ref": "#/components/schemas/UpdateSubscriptionRequest"
  },
  "POST /api/control-plane/systems": {
    "$ref": "#/components/schemas/CreateSystemRequest"
  },
  "PATCH /api/control-plane/systems/{id}": {
    "$ref": "#/components/schemas/UpdateSystemRequest"
  },
  "POST /api/deployments": {
    "$ref": "#/components/schemas/DeployVersionRequest"
  },
  "POST /api/environments": {
    "$ref": "#/components/schemas/EnvironmentInsert"
  },
  "POST /api/instructions": {
    "$ref": "#/components/schemas/InstructionInsert"
  },
  "POST /api/instructions/get": {
    "$ref": "#/components/schemas/InstructionGetRequest"
  },
  "PUT /api/instructions/{id}": {
    "$ref": "#/components/schemas/InstructionUpdate"
  },
  "PUT /api/knowledge-bases/{id}/access": {
    "$ref": "#/components/schemas/SetKnowledgeBaseAccessRequest"
  },
  "DELETE /api/knowledge/sources/{id}/documents": {
    "$ref": "#/components/schemas/DeleteDocumentsRequest"
  },
  "POST /api/tools": {
    "$ref": "#/components/schemas/ToolInsert"
  },
  "PUT /api/tools/{id}": {
    "$ref": "#/components/schemas/ToolUpdate"
  },
  "POST /api/workflow-package-versions/verify": {
    "$ref": "#/components/schemas/VerifyVersionRequest"
  },
  "POST /api/workflows": {
    "$ref": "#/components/schemas/WorkflowInsert"
  },
  "POST /api/workflows/gates/{gate_id}/resolve": {
    "$ref": "#/components/schemas/GateResolveRequest"
  },
  "POST /api/workflows/preflight": {
    "$ref": "#/components/schemas/WorkflowPreflightRequest"
  },
  "POST /api/workflows/resume": {
    "$ref": "#/components/schemas/WorkflowResumeRequest"
  },
  "POST /api/workflows/run": {
    "$ref": "#/components/schemas/WorkflowRunRequest"
  },
  "POST /api/workflows/stream": {
    "$ref": "#/components/schemas/WorkflowRunRequest"
  },
  "PUT /api/workflows/{id}": {
    "$ref": "#/components/schemas/WorkflowUpdate"
  },
  "POST /api/workflows/{id}/triggers/{trigger_id}/test": {
    "$ref": "#/components/schemas/WorkflowTriggerTestRequest"
  },
  "POST /v1/chat/completions": {
    "$ref": "#/components/schemas/ChatCompletionRequest"
  }
};
export const responseSchemas: Record<string, Record<string, unknown>> = {
  "POST /api/agent/run": {
    "200": {
      "$ref": "#/components/schemas/WorkflowExecutionResponse"
    },
    "202": {
      "$ref": "#/components/schemas/WorkflowWaitingResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "406": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "422": {
      "$ref": "#/components/schemas/ApiError"
    },
    "429": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "502": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    },
    "504": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/agent/stream": {
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "406": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/agent/stream": {
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "406": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "422": {
      "$ref": "#/components/schemas/ApiError"
    },
    "429": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "502": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    },
    "504": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/agents": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/AgentListRow"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/agents": {
    "201": {
      "$ref": "#/components/schemas/AgentResponse"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/agents/{id}": {
    "200": {
      "$ref": "#/components/schemas/AgentDetailResponse"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "PUT /api/agents/{id}": {
    "200": {
      "$ref": "#/components/schemas/AgentResponse"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "DELETE /api/agents/{id}": {
    "200": {
      "$ref": "#/components/schemas/DeleteResponse"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/analytics/agents": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/AgentListRow"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/analytics/conversations": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/ConversationSummaryPageRow"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/analytics/conversations/{conversation_id}": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/ConversationMessage"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/analytics/grounding": {
    "200": {
      "$ref": "#/components/schemas/GroundingSummaryResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/analytics/run-aggregates": {
    "200": {
      "$ref": "#/components/schemas/DashboardRunAggregates"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/analytics/run-stats": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/WorkflowRunStatsRow"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/analytics/runs": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/WorkflowRunResponse"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/analytics/runs/{run_id}": {
    "200": {
      "$ref": "#/components/schemas/WorkflowRunRow"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/analytics/runs/{run_id}/checkpoints": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/WorkflowCheckpointSummary"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/analytics/runs/{run_id}/gates": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/WorkflowGateSummary"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/business-connections": {
    "200": {
      "$ref": "#/components/schemas/ConnectionsResponse"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/business-connections/authorize": {
    "200": {
      "$ref": "#/components/schemas/AuthorizationInfo"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/business-connections/callback": {
    "200": {
      "$ref": "#/components/schemas/ConnectionResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/business-connections/providers": {
    "200": {
      "$ref": "#/components/schemas/ProvidersResponse"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "DELETE /api/business-connections/{id}": {
    "200": {
      "$ref": "#/components/schemas/DisconnectInfo"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/business-connections/{id}/messages": {
    "200": {
      "$ref": "#/components/schemas/MessagesResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "429": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/business-connections/{id}/messages/{message_id}": {
    "200": {
      "$ref": "#/components/schemas/MessageResponse"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "429": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/chat-products": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/ChatProduct"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/chat-products/{id}/access": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/ChatProductAccessRule"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "PUT /api/chat-products/{id}/access": {
    "200": {
      "$ref": "#/components/schemas/ChatProductAccessUpdateResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/chat-products/{id}/conversations": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/Conversation"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/chat-products/{id}/send": {
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/completion-node-models": {
    "200": {
      "$ref": "#/components/schemas/CompletionNodeModelList"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "429": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/completion-node-models": {
    "201": {
      "$ref": "#/components/schemas/CompletionNodeModel"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/completion-node-models/{id}": {
    "200": {
      "$ref": "#/components/schemas/CompletionNodeModel"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "PUT /api/completion-node-models/{id}": {
    "200": {
      "$ref": "#/components/schemas/CompletionNodeModel"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "DELETE /api/completion-node-models/{id}": {
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/api-keys": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/PlatformApiKeyInfo"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/control-plane/api-keys": {
    "201": {
      "$ref": "#/components/schemas/PlatformApiKeyResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "DELETE /api/control-plane/api-keys/{id}": {
    "200": {
      "$ref": "#/components/schemas/ControlPlaneResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/audit-logs": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/AuditLog"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/credentials": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/CredentialInfo"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/control-plane/credentials": {
    "200": {
      "$ref": "#/components/schemas/CredentialResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/credentials/{provider}": {
    "200": {
      "$ref": "#/components/schemas/MaskedCredentialResponse"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "DELETE /api/control-plane/credentials/{provider}": {
    "200": {
      "$ref": "#/components/schemas/CredentialResponse"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/inference-devices": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/InferenceDeviceDeclaration"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/control-plane/inference-devices": {
    "200": {
      "$ref": "#/components/schemas/InferenceDeviceDeclaration"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "DELETE /api/control-plane/inference-devices/{id}": {
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/plans": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/SubscriptionPlan"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/policies": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/PolicyInfo"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/control-plane/policies": {
    "201": {
      "$ref": "#/components/schemas/PolicyResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/policies/{id}": {
    "200": {
      "$ref": "#/components/schemas/PolicyResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "PATCH /api/control-plane/policies/{id}": {
    "200": {
      "$ref": "#/components/schemas/PolicyResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "DELETE /api/control-plane/policies/{id}": {
    "200": {
      "$ref": "#/components/schemas/ControlPlaneResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/policy-enforcement-audit": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/PolicyEnforcementAuditRow"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/control-plane/provider-connections/{id}/test": {
    "200": {
      "$ref": "#/components/schemas/TestConnectionResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "502": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    },
    "504": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/control-plane/provider-connections/{id}/test/cancel": {
    "200": {
      "$ref": "#/components/schemas/ProviderProbeCancellationResponse"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/rules": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/RuleInfo"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/control-plane/rules": {
    "201": {
      "$ref": "#/components/schemas/RuleResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/rules/{id}": {
    "200": {
      "$ref": "#/components/schemas/RuleResponse"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "PATCH /api/control-plane/rules/{id}": {
    "200": {
      "$ref": "#/components/schemas/RuleResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "DELETE /api/control-plane/rules/{id}": {
    "200": {
      "$ref": "#/components/schemas/ControlPlaneResponse"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/rulesets": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/RulesetInfo"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/control-plane/rulesets": {
    "201": {
      "$ref": "#/components/schemas/RulesetResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/rulesets/{id}": {
    "200": {
      "$ref": "#/components/schemas/RulesetResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "PATCH /api/control-plane/rulesets/{id}": {
    "200": {
      "$ref": "#/components/schemas/RulesetResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "DELETE /api/control-plane/rulesets/{id}": {
    "200": {
      "$ref": "#/components/schemas/ControlPlaneResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/service-accounts": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/ServiceAccountInfo"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/control-plane/service-accounts": {
    "201": {
      "$ref": "#/components/schemas/ServiceAccountResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/service-accounts/{id}": {
    "200": {
      "$ref": "#/components/schemas/ServiceAccountResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "PATCH /api/control-plane/service-accounts/{id}": {
    "200": {
      "$ref": "#/components/schemas/ServiceAccountResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "DELETE /api/control-plane/service-accounts/{id}": {
    "200": {
      "$ref": "#/components/schemas/ControlPlaneResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/subscription": {
    "200": {
      "$ref": "#/components/schemas/SubscriptionResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "PUT /api/control-plane/subscription": {
    "200": {
      "$ref": "#/components/schemas/SubscriptionResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/systems": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/SystemInfo"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/control-plane/systems": {
    "201": {
      "$ref": "#/components/schemas/SystemResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/systems/{id}": {
    "200": {
      "$ref": "#/components/schemas/SystemResponse"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "PATCH /api/control-plane/systems/{id}": {
    "200": {
      "$ref": "#/components/schemas/SystemResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "DELETE /api/control-plane/systems/{id}": {
    "200": {
      "$ref": "#/components/schemas/ControlPlaneResponse"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "PUT /api/control-plane/systems/{id}/set-default": {
    "200": {
      "$ref": "#/components/schemas/SystemResponse"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/systems/{id}/usage": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/SystemUsageItem"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/usage": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/ApiUsage"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/usage/billing-events": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/UsageBillingFeedEvent"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/usage/billing-events/stream": {
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/usage/billing-rollups": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/UsageDailyRollup"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/usage/storage": {
    "200": {
      "$ref": "#/components/schemas/StoredDataUsageSummary"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/usage/summary": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/UsageSummary"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/control-plane/usage/totals": {
    "200": {
      "$ref": "#/components/schemas/UsageTotals"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/conversations/{id}/messages": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/ConversationMessage"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/deployments": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/DeploymentRowResponse"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/deployments": {
    "201": {
      "$ref": "#/components/schemas/DeploymentResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "422": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/editor/context": {
    "200": {
      "$ref": "#/components/schemas/ReferenceDataPage"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/embedding-models": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/EmbeddingModelRow"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/environments": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/Environment"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/environments": {
    "201": {
      "$ref": "#/components/schemas/Environment"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/environments/{slug}/active-deployment": {
    "200": {
      "$ref": "#/components/schemas/ActiveDeploymentResponse"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/groups": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/Group"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/groups/{id}/members": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/GroupMembership"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/instructions": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/InstructionList"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/instructions": {
    "201": {
      "$ref": "#/components/schemas/InstructionResponse"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/instructions/get": {
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/instructions/{id}": {
    "200": {
      "$ref": "#/components/schemas/InstructionResponse"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "PUT /api/instructions/{id}": {
    "200": {
      "$ref": "#/components/schemas/InstructionResponse"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "DELETE /api/instructions/{id}": {
    "200": {
      "$ref": "#/components/schemas/DeleteResponse"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/knowledge-bases": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/KnowledgeBase"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/knowledge-bases/{id}/access": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/KnowledgeBaseAccessRule"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "PUT /api/knowledge-bases/{id}/access": {
    "200": {
      "$ref": "#/components/schemas/KnowledgeBaseAccessUpdateResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/knowledge/documents/{document_id}/preview": {
    "200": {
      "$ref": "#/components/schemas/KnowledgeDocumentPreview"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/knowledge/documents/{document_id}/versions/{version_id}/original": {
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "406": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/knowledge/documents/{id}/audit": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/AuditLog"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/knowledge/documents/{id}/chunks": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/KnowledgeChunkSample"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/knowledge/eval-runs/{id}/results": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/KnowledgeEvalResult"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/knowledge/search-logs": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/KnowledgeSearchLog"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/knowledge/sources": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/KnowledgeSourceListRow"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/knowledge/sources/{id}/documents": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/KnowledgeDocumentListRow"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "DELETE /api/knowledge/sources/{id}/documents": {
    "200": {
      "$ref": "#/components/schemas/DeleteDocumentsResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/knowledge/sources/{id}/eval-runs": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/KnowledgeEvalRun"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/knowledge/sources/{id}/tags": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/KnowledgeTag"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/knowledge/sources/{id}/test-queries": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/KnowledgeTestQuery"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/knowledge/stats": {
    "200": {
      "$ref": "#/components/schemas/KnowledgeTotals"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/models": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/ModelRow"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/providers": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/ProviderRow"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/reference-data": {
    "200": {
      "$ref": "#/components/schemas/ReferenceDataPage"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/report-templates": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/ReportTemplateSummary"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/report-templates/{id}/versions": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/ReportTemplateVersionRow"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/tools": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/ToolListRow"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/tools": {
    "201": {
      "$ref": "#/components/schemas/ToolResponse"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/tools/{id}": {
    "200": {
      "$ref": "#/components/schemas/ToolResponse"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "PUT /api/tools/{id}": {
    "200": {
      "$ref": "#/components/schemas/ToolResponse"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "DELETE /api/tools/{id}": {
    "200": {
      "$ref": "#/components/schemas/DeleteResponse"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/workflow-package-versions": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/VersionSummaryResponse"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/workflow-package-versions/verify": {
    "200": {
      "$ref": "#/components/schemas/VerifyVersionResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/workflow-package-versions/{name}/history": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/VersionSummaryResponse"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/workflows": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/WorkflowListRow"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/workflows": {
    "201": {
      "$ref": "#/components/schemas/WorkflowResponse"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/workflows/gates": {
    "200": {
      "type": "object",
      "description": "One bounded page of a mutable collection. An absent cursor is the last page.",
      "required": [
        "items"
      ],
      "properties": {
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/components/schemas/WorkflowGateSummary"
          }
        },
        "next_cursor": {
          "type": "string",
          "nullable": true
        }
      }
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/workflows/gates/{gate_id}/cancel": {
    "200": {
      "$ref": "#/components/schemas/GateCancelResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/workflows/gates/{gate_id}/resolve": {
    "200": {
      "$ref": "#/components/schemas/GateResolveResponse"
    },
    "202": {
      "$ref": "#/components/schemas/WorkflowWaitingResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "422": {
      "$ref": "#/components/schemas/ApiError"
    },
    "429": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "502": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    },
    "504": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/workflows/preflight": {
    "200": {
      "$ref": "#/components/schemas/WorkflowPreflightResponse"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/workflows/resume": {
    "200": {
      "$ref": "#/components/schemas/WorkflowExecutionResponse"
    },
    "202": {
      "$ref": "#/components/schemas/WorkflowWaitingResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "422": {
      "$ref": "#/components/schemas/ApiError"
    },
    "429": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "502": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    },
    "504": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/workflows/run": {
    "200": {
      "$ref": "#/components/schemas/WorkflowExecutionResponse"
    },
    "202": {
      "$ref": "#/components/schemas/WorkflowWaitingResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "422": {
      "$ref": "#/components/schemas/ApiError"
    },
    "429": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "502": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    },
    "504": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/workflows/runs/{run_id}/cancel": {
    "200": {
      "$ref": "#/components/schemas/CancelWorkflowRunResponse"
    },
    "202": {
      "$ref": "#/components/schemas/CancelWorkflowRunResponse"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/workflows/runs/{run_id}/interaction-history": {
    "200": {
      "$ref": "#/components/schemas/InteractionHistory"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/workflows/stream": {
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/workflows/stream": {
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /api/workflows/{id}": {
    "200": {
      "$ref": "#/components/schemas/WorkflowResponse"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "PUT /api/workflows/{id}": {
    "200": {
      "$ref": "#/components/schemas/WorkflowResponse"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "DELETE /api/workflows/{id}": {
    "200": {
      "$ref": "#/components/schemas/DeleteResponse"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/workflows/{id}/restore": {
    "200": {
      "$ref": "#/components/schemas/WorkflowRestoreResponse"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /api/workflows/{id}/triggers/{trigger_id}/test": {
    "200": {
      "$ref": "#/components/schemas/WorkflowTriggerTestResponse"
    },
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "404": {
      "$ref": "#/components/schemas/ApiError"
    },
    "409": {
      "$ref": "#/components/schemas/ApiError"
    },
    "413": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "GET /ready": {
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  },
  "POST /v1/chat/completions": {
    "400": {
      "$ref": "#/components/schemas/ApiError"
    },
    "401": {
      "$ref": "#/components/schemas/ApiError"
    },
    "402": {
      "$ref": "#/components/schemas/ApiError"
    },
    "403": {
      "$ref": "#/components/schemas/ApiError"
    },
    "429": {
      "$ref": "#/components/schemas/ApiError"
    },
    "500": {
      "$ref": "#/components/schemas/ApiError"
    },
    "502": {
      "$ref": "#/components/schemas/ApiError"
    },
    "503": {
      "$ref": "#/components/schemas/ApiError"
    }
  }
};
export const idempotentOperations: readonly { method: string; path: string }[] = [
  {
    "method": "POST",
    "path": "/api/agent/run"
  },
  {
    "method": "POST",
    "path": "/api/agent/stream"
  },
  {
    "method": "POST",
    "path": "/api/chat-products/{id}/send"
  },
  {
    "method": "POST",
    "path": "/api/workflows/gates/{gate_id}/cancel"
  },
  {
    "method": "POST",
    "path": "/api/workflows/gates/{gate_id}/resolve"
  },
  {
    "method": "POST",
    "path": "/api/workflows/resume"
  },
  {
    "method": "POST",
    "path": "/api/workflows/run"
  },
  {
    "method": "POST",
    "path": "/api/workflows/runs/{run_id}/cancel"
  },
  {
    "method": "POST",
    "path": "/api/workflows/stream"
  },
  {
    "method": "POST",
    "path": "/api/workflows/{id}/triggers/{trigger_id}/test"
  }
];
