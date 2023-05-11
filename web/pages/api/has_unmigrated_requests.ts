import { dbExecute } from "../../lib/api/db/dbExecute";
import { HandlerWrapperOptions, withAuth } from "../../lib/api/handlerWrappers";
import { getRequests } from "../../lib/api/request/request";
import { Result, resultMap } from "../../lib/result";

async function handler(option: HandlerWrapperOptions<Result<boolean, string>>) {
  const {
    res,
    userData: { userId },
  } = option;

  const query = `
  SELECT EXISTS (
    select * from request
      left join user_api_keys on user_api_keys.api_key_hash = request.auth_hash
    WHERE (
      user_api_keys.user_id = $1
      AND request.created_at < '2023-04-24'  
    )
  )
`;
  console.log(query);

  res.status(200).json(
    resultMap(
      await dbExecute<{
        exists: boolean;
      }>(query, [userId]),
      (data) => (data.length > 0 ? data[0]?.exists : false)
    )
  );
}

export default withAuth(handler);