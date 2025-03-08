import { createClient } from "../../../utils/supabase/server";

export async function logError(error: Error, functionName?: string, fileName?: string, lineNumber?: number, user_ID?: string) {
    const supabase = await createClient();
    supabase
      .from('errors')
      .insert([{
        user_id: user_ID, // თუ იუზერი ცნობილია, აქ შეგიძლია `user_id` ჩაწერო
        error_message: error.message,
        stack_trace: error.stack || null,
        function_name: functionName || null,
        file_name: fileName || null,
        line_number: lineNumber || null,
        status: 'unresolved'
      }]);
  }
  