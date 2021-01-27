/***************************************************************************
 * Copyright (c) 2018, Voilà contributors                                   *
 * Copyright (c) 2018, QuantStack                                           *
 *                                                                          *
 * Distributed under the terms of the BSD 3-Clause License.                 *
 *                                                                          *
 * The full license is in the file LICENSE, distributed with this software. *
 ****************************************************************************/

import { Kernel, ServerConnection } from '@jupyterlab/services';
import { PageConfig } from '@jupyterlab/coreutils';

export async function connectKernel(
  baseUrl: string,
  kernelId: string
): Promise<Kernel.IKernel> {
  baseUrl = baseUrl || PageConfig.getBaseUrl();
  kernelId = kernelId || PageConfig.getOption('kernelId');
  const connectionInfo = ServerConnection.makeSettings({ baseUrl });

  const model = await Kernel.findById(kernelId, connectionInfo);
  const kernel = Kernel.connectTo(model, connectionInfo);
  return kernel;
}
